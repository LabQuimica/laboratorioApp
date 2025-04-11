import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { useAuthStore } from "@/src/stores/auth";
import { Redirect } from "expo-router";

export default function MenuLayout() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Si está autenticado, mostrar la navegación protegida
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inicio",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Inicio",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
