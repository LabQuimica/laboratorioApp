import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function StackLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#171717" : "#ffffff";

  return (
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
      }}
    >
      <Stack.Screen
        name="avatars"
        options={{
          headerShown: false,
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
    </Stack>
  );
}
