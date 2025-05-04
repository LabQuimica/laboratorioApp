import {
  Alert,
  View,
  AppState,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/src/stores/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [codigo, setcodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const codigoRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [nameError, setNameError] = useState("");
  const [codigoError, setcodigoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  // Get the register function from auth store
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    // Reset previous errors
    setNameError("");
    setcodigoError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError("");

    // Validate fields
    let isValid = true;

    if (!name.trim()) {
      setNameError("El nombre es obligatorio");
      isValid = false;
    }

    if (!codigo.trim()) {
      setcodigoError("El código es obligatorio");
      isValid = false;
    } else if (codigo.length > 10) {
      setcodigoError("El código no puede exceder los 10 dígitos");
      isValid = false;
    } else if (!/^\d+$/.test(codigo)) {
      setcodigoError("El código debe contener solo números");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio");
      isValid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    if (nameRef.current) nameRef.current.blur();
    if (codigoRef.current) codigoRef.current.blur();
    if (emailRef.current) emailRef.current.blur();
    if (passwordRef.current) passwordRef.current.blur();
    if (confirmPasswordRef.current) confirmPasswordRef.current.blur();

    try {
      // Use the register function from auth store
      await register({
        email,
        password,
        name,
        codigo,
        img: "lorelei-neutral/avatar-001.svg",
      });

      router.push("/(protected)/(tabs)/");
    } catch (error) {
      console.log(error);
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white dark:bg-neutral-900">
        <View className="flex-1">
          <View className="flex h-28 pt-14 justify-center items-center rounded-b-full">
            <Text className="text-black dark:text-white text-xl text-center">
              Ingresa los siguientes datos
            </Text>
          </View>

          <View className="rounded-tl-[3.0rem] flex-1 w-screen justify-between">
            <View className="gap-4">
              <View className="space-y-4 mt-10 gap-6">
                {/* Campo de nombre */}
                <View>
                  <TextInput
                    ref={nameRef}
                    className={`bg-white dark:bg-neutral-800 text-black dark:text-white border ${
                      nameError
                        ? "border-red-500"
                        : "border-neutral-700 dark:border-neutral-700"
                    } w-11/12 mx-auto p-4 h-14 rounded-2xl`}
                    placeholder="Nombre Completo"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (text.trim()) setNameError("");
                    }}
                    autoCapitalize="words"
                    onSubmitEditing={() =>
                      codigoRef.current && codigoRef.current.focus()
                    }
                  />
                  {nameError ? (
                    <Text className="text-red-500 text-sm ml-6 mt-1">
                      {nameError}
                    </Text>
                  ) : null}
                </View>

                {/* Campo de código */}
                <View>
                  <TextInput
                    ref={codigoRef}
                    className={`bg-white dark:bg-neutral-800 text-black dark:text-white border ${
                      codigoError
                        ? "border-red-500"
                        : "border-neutral-700 dark:border-neutral-700"
                    } w-11/12 mx-auto p-4 h-14 rounded-2xl`}
                    placeholder="Código (máximo 10 dígitos)"
                    placeholderTextColor="#9ca3af"
                    value={codigo}
                    onChangeText={(text) => {
                      // Solo permitir números
                      if (/^\d*$/.test(text) && text.length <= 10) {
                        setcodigo(text);
                      }
                      if (
                        text.trim() &&
                        /^\d+$/.test(text) &&
                        text.length <= 10
                      ) {
                        setcodigoError("");
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                    onSubmitEditing={() =>
                      emailRef.current && emailRef.current.focus()
                    }
                  />
                  {codigoError ? (
                    <Text className="text-red-500 text-sm ml-6 mt-1">
                      {codigoError}
                    </Text>
                  ) : null}
                </View>

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
                <View className="relative ">
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
                    onSubmitEditing={() =>
                      confirmPasswordRef.current &&
                      confirmPasswordRef.current.focus()
                    }
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

                {/* Campo de confirmación de contraseña */}
                <View className="relative">
                  <TextInput
                    ref={confirmPasswordRef}
                    className={`bg-white dark:bg-neutral-800 text-black dark:text-white border ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "border-neutral-700 dark:border-neutral-700"
                    } w-11/12 mx-auto p-4 h-14 rounded-2xl`}
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (text === password) {
                        setConfirmPasswordError("");
                      }
                    }}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    onSubmitEditing={handleSubmit}
                    returnKeyType="go"
                  />
                  <TouchableOpacity
                    className="absolute right-10 top-4"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={24}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                  {confirmPasswordError ? (
                    <Text className="text-red-500 text-sm ml-6 mt-1">
                      {confirmPasswordError}
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
              </View>
            </View>

            <View>
              {/* Botón de Registro */}
              <TouchableOpacity
                className={`${
                  loading ? "bg-gray-500" : "bg-primary "
                } w-11/12 py-5 rounded-3xl items-center justify-center mt-10 mx-auto`}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text className="text-white font-semibold text-lg">
                  {loading ? "Cargando..." : "Registrarse"}
                </Text>
              </TouchableOpacity>

              {/* Enlace para iniciar sesión */}
              <View className="flex-row justify-center  mb-14">
                <TouchableOpacity className="mt-8">
                  <Text
                    className="text-black dark:text-white"
                    onPress={() => router.push("/login")}
                  >
                    ¿Ya tienes cuenta?
                    <Text className="font-extrabold"> Inicia sesión</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
