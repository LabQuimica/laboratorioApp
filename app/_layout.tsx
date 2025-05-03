import { Stack } from "expo-router";
import { View } from "react-native";
import "../global.css";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNavigation />
    </ThemeProvider>
  );
}
function RootLayoutNavigation() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const statusBarColor = isDarkMode ? "#171717" : "#ffffff";
  const statusBarStyle = isDarkMode ? "light" : "dark";

  return (
    <View className={`flex-1`}>
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
