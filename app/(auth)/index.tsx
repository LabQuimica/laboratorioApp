import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useColorScheme } from "nativewind";
export default function Welcome() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark px-4">
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-6xl mt-2 text-black dark:text-white">
          Bienvenido
        </Text>
        <Text className="text-lg mt-2 text-black dark:text-slate-300">
          App de Laboratorio de Química
        </Text>
      </View>
      <View className="items-center justify-center w-full px-10 mb-28 gap-8">
        <Pressable
          className="bg-primary w-full py-5 rounded-3xl items-center justify-center"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white font-semibold">Iniciar sesión</Text>
        </Pressable>
        <Pressable
          className="bg-primary w-full py-5 rounded-3xl items-center justify-center"
          onPress={() => router.push("/register")}
        >
          <Text className="text-white font-semibold">Registrarse</Text>
        </Pressable>
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
    </SafeAreaView>
  );
}
