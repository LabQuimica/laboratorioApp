import { View, Text } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import { ValesAlumnoList } from "@/src/components/profile/ValesAlumnoList";

export default function PerfilScreen() {
  const params = useLocalSearchParams<{ selectedAvatar: string }>();

  const { user, logout } = useAuthStore();
  const DEFAULT_AVATAR = user?.img;

  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (params && params.selectedAvatar) {
      setAvatar(params.selectedAvatar);
      setHasChanges(params.selectedAvatar !== DEFAULT_AVATAR);
    }
  }, [params, DEFAULT_AVATAR]);

  const handleSuccess = () => {
    setHasChanges(false);
  };

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ProfileHeader
        user={user}
        avatar={avatar}
        hasChanges={hasChanges}
        onSuccess={handleSuccess}
        onLogout={handleLogout}
      />

      {/* Content below the profile header */}
      <View className="w-full px-6">
        <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Información Adicional
        </Text>
        {/* Add additional profile information here */}
      </View>
      <ValesAlumnoList userId={user?.id_user || 0} />
    </View>
  );
}
