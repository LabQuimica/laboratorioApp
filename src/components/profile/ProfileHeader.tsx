import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SvgUri } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";
import { Badge } from "@/src/components/ui/Badge";
import AvatarConfirmButton from "@/src/components/AvatarConfirmButton";
import { useEffect, useState } from "react";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL_AVATARS;

type UserType = {
  id_user?: number;
  img?: string;
  rol?: string;
  codigo?: string;
  name?: string;
  email?: string;
};

interface ProfileHeaderProps {
  user: UserType | null;
  onLogout: () => Promise<void>;
}

export default function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
  // Get URL params
  const params = useLocalSearchParams<{ selectedAvatar: string }>();
  const DEFAULT_AVATAR = user?.img;

  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Set avatar from user initially
    if (DEFAULT_AVATAR && !avatar) {
      setAvatar(DEFAULT_AVATAR);
    }
  }, [DEFAULT_AVATAR]);

  // Handle selected avatar from params
  useEffect(() => {
    if (params && params.selectedAvatar) {
      if (params.selectedAvatar !== avatar) {
        setAvatar(params.selectedAvatar);
        setHasChanges(params.selectedAvatar !== DEFAULT_AVATAR);
      }

      setTimeout(() => {
        if (params.selectedAvatar) {
          router.setParams({});
        }
      }, 100);
    }
  }, [params, DEFAULT_AVATAR, avatar]);

  const handleSuccess = () => {
    setHasChanges(false);
    // Ensure navigation stack is clean after confirming avatar
    router.setParams({});
  };

  const getRoleVariant = (
    role?: string
  ): "primary" | "progreso" | "success" => {
    if (!role) return "primary";

    switch (role.toLowerCase()) {
      case "administrador":
        return "primary";
      case "profesor":
        return "progreso";
      case "alumno":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <View className="p-6 pt-20">
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
          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-500 dark:text-gray-200">
                {user?.codigo || "0000000000"}
              </Text>
            </View>
            <View>
              {user?.rol && (
                <Badge label={user.rol} variant={getRoleVariant(user.rol)} />
              )}
            </View>
          </View>
          <Text className="text-2xl text-center font-bold text-gray-800 dark:text-white">
            {user?.name || "Usuario"}
          </Text>
          <Text className="text-gray-500 text-center text-sm dark:text-gray-200">
            {user?.email || ""}
          </Text>
          <TouchableOpacity
            className="bg-red-800 w-11/12 py-2 rounded-3xl items-center justify-center mx-auto"
            onPress={onLogout}
          >
            <Text className="text-white text-center">Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm button - only shown when avatar changes */}
      {hasChanges && (
        <View className="w-full mb-4">
          <AvatarConfirmButton
            userId={user?.id_user || 0}
            avatar={avatar || ""}
            onSuccess={handleSuccess}
          />
        </View>
      )}
    </View>
  );
}
