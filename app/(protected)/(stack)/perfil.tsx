import { View, Text } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PerfilScreen() {
  const { user } = useAuthStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 items-center p-6 bg-white dark:bg-gray-900">
      <View className="items-center mb-6">
        <View className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <Ionicons
            name="person-circle"
            size={120}
            color={isDark ? "#ffffff" : "#000000"}
          />
        </View>
        <Text className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          {user?.name || "Usuario"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          {user?.email || ""}
        </Text>
      </View>

      <View className="w-full mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Información de Perfil
        </Text>
        {/* Aquí puedes añadir más información del perfil */}
      </View>
    </View>
  );
}
