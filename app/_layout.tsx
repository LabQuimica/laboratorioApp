import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { View, ActivityIndicator } from "react-native";
import "../global.css";
import { useThemeInitializer } from "@/src/hooks/useThemeInitializer";

export default function RootLayout() {
  const isThemeLoading = useThemeInitializer();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const statusBarColor = isDarkMode ? "#171717" : "#ffffff";
  const statusBarStyle = isDarkMode ? "light" : "dark";

  if (isThemeLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <ActivityIndicator
          size="large"
          color={isDarkMode ? "#ffffff" : "#000000"}
        />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-neutral-900" : "bg-white"}`}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? "#171717" : "#ffffff",
          },
          statusBarBackgroundColor: statusBarColor,
          statusBarStyle: statusBarStyle,
          statusBarHidden: false,
          statusBarTranslucent: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
            headerBackTitle: "Volver",
            headerStyle: {
              backgroundColor: isDarkMode ? "#171717" : "#ffffff",
            },
            headerTintColor: isDarkMode ? "#ffffff" : "#000000",
            statusBarBackgroundColor: isDarkMode ? "#171717" : "#ffffff",
            statusBarStyle: statusBarStyle,
          }}
        />
      </Stack>
    </View>
  );
}
