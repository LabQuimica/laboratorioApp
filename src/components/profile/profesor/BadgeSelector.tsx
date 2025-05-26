import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useToast } from "@/src/contexts/ToastContext";
import { Badge, BadgeVariant } from "@/src/components/ui/Badge";

export type StatusOption = {
  value: string;
  label: string;
  variant: BadgeVariant;
};

export interface BadgeSelectorProps {
  currentStatus: string;
  onStatusChange?: (status: string) => void;
  options?: StatusOption[];
  disabled?: boolean;
  isLoading?: boolean;
  idPracticaAsignada?: number;
  useMutationHook?: () => any;
}

const defaultOptions: StatusOption[] = [
  { value: "pendiente", label: "Pendiente", variant: "pendiente" },
  { value: "progreso", label: "En Progreso", variant: "progreso" },
  { value: "completada", label: "Completada", variant: "completada" },
  { value: "cancelada", label: "Cancelada", variant: "cancelada" },
  { value: "inhabilitada", label: "Inhabilitada", variant: "inhabilitada" },
];

export function BadgeSelector({
  currentStatus,
  onStatusChange,
  options = defaultOptions,
  disabled = false,
  isLoading = false,
  idPracticaAsignada,
  useMutationHook,
}: BadgeSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { showToast } = useToast();

  // Usar el hook de mutación si se proporciona
  const mutation = useMutationHook ? useMutationHook() : null;

  const currentOption =
    options.find(
      (option) => option.value.toLowerCase() === currentStatus.toLowerCase()
    ) || options[0];

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
  };

  const handleConfirmChange = () => {
    if (mutation && idPracticaAsignada) {
      // Usar mutación para actualizar en el servidor
      mutation.mutate(
        {
          idPracticaAsignada: idPracticaAsignada,
          newStatus: selectedStatus,
        },
        {
          onSuccess: () => {
            setIsVisible(false);
            showToast("Estado actualizado correctamente", "success");
          },
          onError: (error: any) => {
            console.error("Error updating status:", error);
            showToast("Error al actualizar el estado", "error");
            // Resetear la selección en caso de error
            setSelectedStatus(currentStatus);
          },
        }
      );
    } else if (onStatusChange) {
      // Usar callback tradicional
      onStatusChange(selectedStatus);
      setIsVisible(false);
    }
  };

  const handleCancel = () => {
    setSelectedStatus(currentStatus); // Resetear a la selección original
    setIsVisible(false);
  };

  // Resetear el estado seleccionado cuando cambie el estado actual
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  // Determinar si está cargando desde la mutación o prop externa
  const isActuallyLoading = mutation?.isPending || isLoading;
  const isActuallyDisabled = disabled || mutation?.isPending;

  if (isActuallyDisabled) {
    return (
      <View className="flex-row items-center">
        <Badge variant={currentOption.variant} label={currentOption.label} />
        {isActuallyLoading && (
          <ActivityIndicator
            size="small"
            color={isDark ? "white" : "black"}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className="flex-row items-center"
      >
        <Badge variant={currentOption.variant} label={currentOption.label} />
        <Ionicons
          name="chevron-down"
          size={16}
          color={isDark ? "white" : "black"}
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/50"
          onPress={handleCancel}
        >
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mx-4 min-w-[250px] max-w-[300px]">
            <Text className="text-lg font-semibold text-center mb-4 text-black dark:text-white">
              Cambiar Estado
            </Text>

            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleStatusSelect(option.value)}
                className={`p-3 rounded-lg mb-2 ${
                  option.value.toLowerCase() === selectedStatus.toLowerCase()
                    ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500"
                    : "bg-gray-50 dark:bg-gray-700/50"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <Badge variant={option.variant} label={option.label} />
                  {option.value.toLowerCase() ===
                    selectedStatus.toLowerCase() && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#3B82F6"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <View className="mt-4 space-y-2">
              <TouchableOpacity
                onPress={handleConfirmChange}
                className={`p-3 rounded-lg ${
                  selectedStatus === currentStatus || isActuallyLoading
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "bg-blue-500"
                }`}
                disabled={selectedStatus === currentStatus || isActuallyLoading}
              >
                <View className="flex-row items-center justify-center">
                  {isActuallyLoading && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                  )}
                  <Text
                    className={`text-center font-semibold ${
                      selectedStatus === currentStatus || isActuallyLoading
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {isActuallyLoading
                      ? "Actualizando..."
                      : selectedStatus === currentStatus
                      ? "Sin Cambios"
                      : "Confirmar Cambios"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={handleCancel}
                className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg"
              >
                <Text className="text-center font-medium text-black dark:text-white">
                  Cancelar
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
