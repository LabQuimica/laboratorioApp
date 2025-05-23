import { View, Text } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import { ValesAlumnoList } from "@/src/components/profile/ValesAlumnoList";

export default function PerfilScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ProfileHeader user={user} onLogout={handleLogout} />
      <View className="w-full px-6">
        <Text className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-2">
          Mis Vales
        </Text>
      </View>
      <ValesAlumnoList userId={user?.id_user || 0} />
    </View>
  );
}
