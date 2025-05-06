import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { updateUserAvatar } from "@/src/services/userService";
import { useAuthStore } from "@/src/stores/auth";
import { useToast } from "@/src/contexts/ToastContext";

interface AvatarConfirmButtonProps {
  userId: number;
  avatar: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function AvatarConfirmButton({
  userId,
  avatar,
  onSuccess,
  onError,
}: AvatarConfirmButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateUserAvatar: updateAuthAvatar } = useAuthStore();
  const { showToast } = useToast();

  const handleConfirm = async () => {
    if (!userId || !avatar) return;

    setIsLoading(true);
    try {
      await updateUserAvatar(userId.toString(), avatar);
      await updateAuthAvatar(avatar);
      showToast("Avatar actualizado correctamente", "success");
      onSuccess?.();
    } catch (error) {
      console.error("Error al actualizar avatar:", error);
      showToast("No se pudo actualizar el avatar", "error");
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleConfirm}
      disabled={isLoading}
      className="bg-primary py-3 px-6 rounded-lg flex-row items-center justify-center"
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="text-white font-semibold text-base">
          Confirmar Cambios
        </Text>
      )}
    </TouchableOpacity>
  );
}
