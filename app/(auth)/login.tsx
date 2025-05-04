import { useRouter } from "expo-router";
import { useAuthStore } from "@/src/stores/auth";
import { LoginData } from "@/src/types/user";
import React, { useRef, useState } from "react";
import {
  Alert,
  View,
  TextInput,
  Text,
  AppState,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useColorScheme } from "nativewind";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const isDarkMode = colorScheme === "dark";

  const handleLogin = async () => {
    Keyboard.dismiss();
    Keyboard.dismiss();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setFormError("");

    // Validate fields
    let isValid = true;

    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio");
      isValid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    if (emailRef.current) {
      emailRef.current.blur();
    }

    if (passwordRef.current) {
      passwordRef.current.blur();
    }

    try {
      await login({ email, password });
      router.replace("/(protected)");
    } catch (err) {
      setFormError("No se pudo iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-background dark:bg-background-dark pt-20 justify-between">
        <View className="space-y-4 mt-28 ">
          <View>
            <TextInput
              ref={emailRef}
              className={`bg-white dark:bg-neutral-800 text-black dark:text-white border ${
                emailError
                  ? "border-red-500"
                  : "border-neutral-700 dark:border-neutral-700"
              } w-11/12 mx-auto p-4 h-14 rounded-2xl`}
              placeholder="Correo Electrónico"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (text.trim()) setEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onSubmitEditing={() =>
                passwordRef.current && passwordRef.current.focus()
              }
            />
            {emailError ? (
              <Text className="text-red-500 text-sm ml-6 mt-1">
                {emailError}
              </Text>
            ) : null}
          </View>

          {/* Campo de contraseña */}
          <View className="relative mt-10">
            <TextInput
              ref={passwordRef}
              className={`bg-white dark:bg-neutral-800 text-black dark:text-white border ${
                passwordError
                  ? "border-red-500"
                  : "border-neutral-700 dark:border-neutral-700"
              } w-11/12 mx-auto p-4 h-14 rounded-2xl`}
              placeholder="Contraseña"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) {
                  setPasswordError("");
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onSubmitEditing={handleLogin}
              returnKeyType="go"
            />
            <TouchableOpacity
              className="absolute right-10 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#9ca3af"
              />
            </TouchableOpacity>
            {passwordError ? (
              <Text className="text-red-500 text-sm ml-6 mt-1">
                {passwordError}
              </Text>
            ) : null}
          </View>

          {/* Mostrar error de formulario del backend */}
          {formError ? (
            <View className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mx-5 mt-2">
              <Text className="text-red-600 dark:text-red-400 text-center">
                {formError}
              </Text>
            </View>
          ) : null}

          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity
            className={`${
              loading ? "bg-gray-500" : "bg-primary "
            } w-11/12 py-5 rounded-3xl items-center justify-center mt-10 mx-auto`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center w-full mb-10">
          <Image
            source={
              isDarkMode
                ? require("@/assets/images/ciencias_dark.png")
                : require("@/assets/images/ciencias_light.png")
            }
            className="w-60 h-60"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
