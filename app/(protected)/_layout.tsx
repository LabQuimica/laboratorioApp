import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { useAuthStore } from "@/src/stores/auth";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function MenuLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#171717" : "#ffffff";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/(auth)");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)" options={{ presentation: "modal" }} />
        <Stack.Screen name="index" redirect={true} />
      </Stack>
    </View>
  );
}
