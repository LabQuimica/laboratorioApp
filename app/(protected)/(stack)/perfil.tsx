import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeSelector from "@/src/components/selector/themeSelector";
import { SvgUri } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AvatarConfirmButton from "@/src/components/AvatarConfirmButton";
import { Badge } from "@/src/components/ui/Badge";
import ToastExample from "@/src/components/ToastExample";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL_AVATARS;

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

  const getRoleVariant = (
    role?: string
  ): "primary" | "secondary" | "success" => {
    if (!role) return "primary";

    switch (role.toLowerCase()) {
      case "administrador":
        return "primary";
      case "profesor":
        return "secondary";
      case "alumno":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <ScrollView className="flex-1 bg-background dark:bg-background-dark">
      <View className="p-6 pt-32">
        {hasChanges && (
          <View className="w-full mb-4">
            <AvatarConfirmButton
              userId={user?.id_user || 0}
              avatar={avatar || ""}
              onSuccess={handleSuccess}
            />
          </View>
        )}

        {/* Two column layout: Avatar left, User info right */}
        <View className="flex-row mb-6">
          {/* Left column - Avatar */}
          <View className="flex-1">
            <TouchableOpacity
              className="w-40 h-40 bg-background dark:bg-background-dark rounded-full items-center justify-center relative border-2 border-gray-200 dark:border-gray-700"
              onPress={() => router.push("/avatars")}
            >
              {avatar ? (
                <View className="w-full h-full overflow-hidden rounded-full">
                  <SvgUri
                    width="100%"
                    height="100%"
                    uri={`${BASE_URL}${avatar}`}
                  />
                </View>
              ) : (
                <Ionicons name="person" size={48} color="#9ca3af" />
              )}
              <View className="absolute bottom-1 right-1 bg-primary rounded-full w-10 h-10 items-center justify-center">
                <Ionicons name="camera" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Right column - User basic info */}
          <View className="flex-1 justify-center gap-4">
            <View className=" flex-row justify-between">
              <View className="">
                {user?.rol && (
                  <Badge label={user.rol} variant={getRoleVariant(user.rol)} />
                )}
              </View>
              <View>
                <Text className="text-gray-500 dark:text-gray-200">
                  {user?.codigo || ""}
                </Text>
              </View>
            </View>
            <Text className="text-2xl text-center font-bold text-gray-800 dark:text-white">
              {user?.name || "Usuario"}
            </Text>
            <Text className="text-gray-500 text-center text-sm dark:text-gray-200 ">
              {user?.email || ""}
            </Text>
            <TouchableOpacity
              className={`bg-red-800 w-11/12 py-2 rounded-3xl items-center justify-center mx-auto`}
              onPress={handleLogout}
            >
              <Text className="text-white text-center">Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content below the two-column section */}
        <View className="w-full mt-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Información Adicional
          </Text>
          <Text className="text-gray-500 dark:text-gray-400">
            Fecha: {user?.date || ""}
          </Text>
          <ThemeSelector />
        </View>
      </View>
    </ScrollView>
  );
}
