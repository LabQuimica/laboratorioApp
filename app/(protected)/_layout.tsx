import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { useAuthStore } from "@/src/stores/auth";
import { useRouter } from "expo-router";

export default function MenuLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)" options={{ presentation: "modal" }} />
      <Stack.Screen name="index" redirect={true} />
    </Stack>
  );
}
