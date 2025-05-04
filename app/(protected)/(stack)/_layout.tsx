import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function StackLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#171717" : "#ffffff";

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor,
          },
          headerTintColor: isDark ? "#ffffff" : "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: { backgroundColor },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="details"
          options={{
            title: "Detalles",
            headerShown: true,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="perfil"
          options={{
            title: "Perfil",
            headerShown: true,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
