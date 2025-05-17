import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import { useRouter } from "expo-router";
import { SvgUri } from "react-native-svg";

type IconName = "home" | "person";

export default function TabsLayout() {
  const { user } = useAuthStore();
  const router = useRouter();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL_AVATARS;

  const avatarUrl = user?.img
    ? `${BASE_URL}${user.img}`
    : `${BASE_URL}default.svg`;

  const handleAvatarPress = () => {
    router.push("/perfil");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          width: "30%",
          bottom: 20,
          left: 20,
          right: 20,
          marginLeft: "5%",
          elevation: 50,
          borderRadius: 30,
          height: 56,
          backgroundColor: "#171717",
          borderTopWidth: 0,
          paddingHorizontal: 0,
          overflow: "hidden",
          paddingTop: 7,
        },
        tabBarItemStyle: {
          flex: 1,
          height: 56,
          alignItems: "center",
          justifyContent: "center",
        },
        headerStyle: {
          backgroundColor: isDark ? "#171717" : "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        tabBarActiveTintColor: "#FFFFFF", // Blanco para el ícono activo
        tabBarInactiveTintColor: "#666666", // Gris para los inactivos
        tabBarShowLabel: false,
        // Add avatar to header right
        headerRight: () => (
          <TouchableOpacity
            onPress={handleAvatarPress}
            className="mr-4 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700"
            style={{ width: 40, height: 40 }}
          >
            <SvgUri
              width="100%"
              height="100%"
              uri={avatarUrl}
              onError={() => console.log("Error loading SVG")}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="person"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="calendar"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({
  name,
  color,
  size,
  focused,
}: {
  name: IconName;
  color: string;
  size: number;
  focused: boolean;
}) {
  return (
    <View
      className={`items-center justify-center ${
        focused ? "bg-white dark:bg-white" : "bg-transparent"
      } rounded-full w-10 h-10 flex`}
    >
      <Ionicons
        name={focused ? name : (`${name}` as any)}
        size={24}
        color={focused ? "#000000" : color} // Negro si está activo, sino el color pasado
      />
    </View>
  );
}
