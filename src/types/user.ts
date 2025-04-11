export type Rol = "administrador" | "profesor" | "alumno";

export interface User {
  id_user: number;
  name: string;
  email: string;
  date: string;
  rol: Rol;
  active: boolean;
  codigo: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: User;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
  }