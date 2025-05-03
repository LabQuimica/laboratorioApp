import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { useColorScheme } from "nativewind";
import queryClient from "@/src/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNavigation />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
function RootLayoutNavigation() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const statusBarColor = isDarkMode ? "#171717" : "#ffffff";
  const statusBarStyle = isDarkMode ? "light" : "dark";

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: isDarkMode ? "#ffffff" : "#ffffff",
        },
        statusBarBackgroundColor: statusBarColor,
        statusBarStyle: statusBarStyle,
        statusBarHidden: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(protected)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
