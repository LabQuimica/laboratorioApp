import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeSelector from "@/src/components/selector/themeSelector";
import { SvgUri } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AvatarConfirmButton from "@/src/components/AvatarConfirmButton";
import ToastExample from "@/src/components/ToastExample";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL_AVATARS;

export default function PerfilScreen() {
  const params = useLocalSearchParams<{ selectedAvatar: string }>();

  const { user } = useAuthStore();
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

  const handleError = (error: any) => {
    // Error will be handled by toast in the button component
  };

  return (
    <View className="flex-1 items-center p-6 bg-background dark:bg-background-dark pt-32">
      {hasChanges && (
        <View className="w-full mb-4">
          <AvatarConfirmButton
            userId={user?.id_user || 0}
            avatar={avatar || ""}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </View>
      )}

      <View className="items-center mb-6">
        <TouchableOpacity
          className="w-40 h-40 bg-background dark:bg-background-dark rounded-full mx-auto items-center justify-center relative border-2 border-gray-200 dark:border-gray-700"
          onPress={() => router.push("/avatars")}
        >
          {avatar ? (
            <View className="w-full h-full overflow-hidden rounded-full">
              <SvgUri width="100%" height="100%" uri={`${BASE_URL}${avatar}`} />
            </View>
          ) : (
            <Ionicons name="person" size={48} color="#9ca3af" />
          )}
          <View className="absolute bottom-1 right-1 bg-primary rounded-full w-10 h-10 items-center justify-center">
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <Text className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          {user?.name || "Usuario"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          {user?.email || ""}
        </Text>
      </View>

      <View className="w-full mt-4 p-4rounded-lg ">
        <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Información de Perfil
        </Text>
        <ThemeSelector />
        <ToastExample />
      </View>
    </View>
  );
}
