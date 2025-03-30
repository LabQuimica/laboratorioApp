import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/src/auth/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
