import ThemeSelector from "@/src/components/selector/themeSelector";
import { Ionicons } from "@expo/vector-icons";
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
          animation: "fade_from_bottom",
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
            headerTransparent: true,
            headerTitleAlign: "center",
            headerRight: () => <ThemeSelector />,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="avatars"
          options={{
            presentation: "formSheet",
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
            gestureEnabled: false,
            sheetGrabberVisible: false,
            sheetInitialDetentIndex: 0,
            sheetAllowedDetents: [0.9],
            sheetCornerRadius: 20,
            sheetExpandsWhenScrolledToEdge: false,
            sheetElevation: 24,
          }}
        />
        <Stack.Screen
          name="practica_seleccionada"
          options={{
            title: "Practica Seleccionada",
            headerShown: true,
            presentation: "card",
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="practicas-materia"
          options={{
            title: "Grupo",
            headerShown: true,
            presentation: "card",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </View>
  );
}
