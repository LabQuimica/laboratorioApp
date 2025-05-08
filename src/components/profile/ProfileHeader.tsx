import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SvgUri } from "react-native-svg";
import { router } from "expo-router";
import { Badge } from "@/src/components/ui/Badge";
import AvatarConfirmButton from "@/src/components/AvatarConfirmButton";

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
  avatar: string | undefined;
  hasChanges: boolean;
  onSuccess: () => void;
  onLogout: () => Promise<void>;
}

export default function ProfileHeader({
  user,
  avatar,
  hasChanges,
  onSuccess,
  onLogout,
}: ProfileHeaderProps) {
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
    <View className="p-6 pt-32">
      {hasChanges && (
        <View className="w-full mb-4">
          <AvatarConfirmButton
            userId={user?.id_user || 0}
            avatar={avatar || ""}
            onSuccess={onSuccess}
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
    </View>
  );
}
