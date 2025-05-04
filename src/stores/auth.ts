import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, User, AuthState, AuthResponse, RegisterData } from '@/src/types/user';
import { saveToken, getStoredToken, clearTokens } from '@/src/utils/token';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Configuramos un interceptor para incluir el token en todas las peticionesr
const setupAxiosInterceptors = async () => {
  axios.interceptors.request.use(async (config) => {
    const token = await getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Ejecutamos la configuración
setupAxiosInterceptors();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post<AuthResponse>(`${API_URL}/auth/registerMovil`, data);
          
          // Guardar el token en SecureStore
          await saveToken(response.data.token);
          
          // Actualizar el estado con la información del usuario
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return response.data;
        } catch (error) {
          console.error('Registration error:', error);
          let errorMessage = 'Error al registrar usuario';
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.error || errorMessage;
          }
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
          
          // Guardar el token en SecureStore
          await saveToken(response.data.token);
          
          // Actualizar el estado con la información del usuario
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('Login error:', error);
          let errorMessage = 'Error al iniciar sesión';
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.error || errorMessage;
          }
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      logout: async () => {
        console.log("logout");
        set({ isLoading: true });
        try {
          // Limpiar token del almacenamiento seguro
          await clearTokens();
          // Actualizar estado
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('Logout error:', error);
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        console.log("checkAuth");
        set({ isLoading: true });
        try {
          // Obtener el token almacenado
          const token = await getStoredToken();
          
          if (!token) {
            set({ isAuthenticated: false, user: null, isLoading: false });
            return;
          }
          
          // Verificar el token en el servidor
          try {
            await axios.get(`${API_URL}/auth/verifytoken`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            

            const currentUser = get().user;
            
            if (currentUser) {
              set({
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } else {

              console.warn('Token válido pero no hay datos de usuario en el estado');
              await clearTokens();
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          } catch (error) {
            // Token inválido o expirado, limpiar todo
            console.error('Invalid token:', error);
            await clearTokens();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          // Error general, limpiar todo por seguridad
          await clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);