import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUpdateFechasPracticaAsignada } from "@/src/hooks/practicas";
import { useToast } from "@/src/contexts/ToastContext";

interface ModificarFechasModalProps {
  visible: boolean;
  onClose: () => void;
  fechaInicio: string;
  fechaFin: string;
  idPracticaAsignada: number;
  onSuccess?: () => void;
}

export const ModificarFechasModal: React.FC<ModificarFechasModalProps> = ({
  visible,
  onClose,
  fechaInicio,
  fechaFin,
  idPracticaAsignada,
  onSuccess,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { showToast } = useToast();

  const updateFechasMutation = useUpdateFechasPracticaAsignada();

  // Función para parsear fecha del formato "dd/mm/yyyy HH:mm" a Date
  const parseCustomDate = (dateString: string): Date => {
    try {
      // Formato esperado: "08/02/2025 13:00"
      if (!dateString || typeof dateString !== "string") {
        return new Date(); // Fecha actual como fallback
      }

      const [datePart, timePart] = dateString.split(" ");

      if (!datePart || !timePart) {
        return new Date(); // Fecha actual como fallback
      }

      const [day, month, year] = datePart.split("/");
      const [hours, minutes] = timePart.split(":");

      // Validar que todos los componentes existan
      if (!day || !month || !year || !hours || !minutes) {
        return new Date(); // Fecha actual como fallback
      }

      // Crear fecha con formato ISO (año, mes-1, día, hora, minuto)
      const parsedDate = new Date(
        parseInt(year),
        parseInt(month) - 1, // Los meses en JavaScript van de 0-11
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );

      // Verificar que la fecha sea válida
      if (isNaN(parsedDate.getTime())) {
        return new Date(); // Fecha actual como fallback
      }

      return parsedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date(); // Fecha actual como fallback
    }
  };

  // Estados para las fechas
  const [fechaInicioDate, setFechaInicioDate] = useState(() =>
    parseCustomDate(fechaInicio)
  );
  const [fechaFinDate, setFechaFinDate] = useState(() =>
    parseCustomDate(fechaFin)
  );

  // Actualizar fechas cuando cambien las props
  useEffect(() => {
    setFechaInicioDate(parseCustomDate(fechaInicio));
    setFechaFinDate(parseCustomDate(fechaFin));
  }, [fechaInicio, fechaFin]);

  // Estados para mostrar los pickers
  const [showInicioDatePicker, setShowInicioDatePicker] = useState(false);
  const [showInicioTimePicker, setShowInicioTimePicker] = useState(false);
  const [showFinDatePicker, setShowFinDatePicker] = useState(false);
  const [showFinTimePicker, setShowFinTimePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDateTime = (date: Date) => {
    // Formatear usando la hora local en lugar de UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSave = async () => {
    if (fechaInicioDate >= fechaFinDate) {
      showToast(
        "La fecha de inicio debe ser anterior a la fecha de fin",
        "error"
      );
      return;
    }

    const fechaInicioFormatted = formatDateTime(fechaInicioDate);
    const fechaFinFormatted = formatDateTime(fechaFinDate);

    // Validar si las fechas han cambiado
    const fechaInicioOriginal = parseCustomDate(fechaInicio);
    const fechaFinOriginal = parseCustomDate(fechaFin);

    const fechaInicioOriginalFormatted = formatDateTime(fechaInicioOriginal);
    const fechaFinOriginalFormatted = formatDateTime(fechaFinOriginal);

    if (
      fechaInicioFormatted === fechaInicioOriginalFormatted &&
      fechaFinFormatted === fechaFinOriginalFormatted
    ) {
      showToast("No se detectaron cambios en las fechas", "info");
      onClose();
      return;
    }

    try {
      await updateFechasMutation.mutateAsync({
        idPracticaAsignada,
        fechaInicio: fechaInicioFormatted,
        fechaFin: fechaFinFormatted,
      });
      showToast("Fechas actualizadas exitosamente", "success");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error al actualizar fechas:", error);
      showToast(
        "No se pudieron actualizar las fechas. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  const onInicioDateChange = (event: any, selectedDate?: Date) => {
    setShowInicioDatePicker(false);
    if (selectedDate) {
      setFechaInicioDate(selectedDate);
    }
  };

  const onInicioTimeChange = (event: any, selectedTime?: Date) => {
    setShowInicioTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(fechaInicioDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setFechaInicioDate(newDate);
    }
  };

  const onFinDateChange = (event: any, selectedDate?: Date) => {
    setShowFinDatePicker(false);
    if (selectedDate) {
      setFechaFinDate(selectedDate);
    }
  };

  const onFinTimeChange = (event: any, selectedTime?: Date) => {
    setShowFinTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(fechaFinDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setFechaFinDate(newDate);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-black dark:text-white">
              Modificar Fechas
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Fecha de Inicio */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-black dark:text-white mb-3">
                Fecha de Inicio
              </Text>

              {/* Selector de Fecha */}
              <TouchableOpacity
                onPress={() => setShowInicioDatePicker(true)}
                className="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-2"
              >
                <Text className="text-black dark:text-white">
                  {formatDate(fechaInicioDate)}
                </Text>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>

              {/* Selector de Hora */}
              <TouchableOpacity
                onPress={() => setShowInicioTimePicker(true)}
                className="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <Text className="text-black dark:text-white">
                  {formatTime(fechaInicioDate)}
                </Text>
                <Ionicons
                  name="time"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>

            {/* Fecha de Fin */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-black dark:text-white mb-3">
                Fecha de Fin
              </Text>

              {/* Selector de Fecha */}
              <TouchableOpacity
                onPress={() => setShowFinDatePicker(true)}
                className="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-2"
              >
                <Text className="text-black dark:text-white">
                  {formatDate(fechaFinDate)}
                </Text>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>

              {/* Selector de Hora */}
              <TouchableOpacity
                onPress={() => setShowFinTimePicker(true)}
                className="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <Text className="text-black dark:text-white">
                  {formatTime(fechaFinDate)}
                </Text>
                <Ionicons
                  name="time"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>

            {/* Botones */}
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
              >
                <Text className="text-black dark:text-white font-medium">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                disabled={updateFechasMutation.isPending}
                className={`px-4 py-2 rounded-lg ${
                  updateFechasMutation.isPending ? "bg-blue-300" : "bg-blue-500"
                }`}
              >
                <Text className="text-white font-medium">
                  {updateFechasMutation.isPending ? "Guardando..." : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Date/Time Pickers */}
          {showInicioDatePicker && (
            <DateTimePicker
              value={fechaInicioDate}
              mode="date"
              display="default"
              onChange={onInicioDateChange}
            />
          )}

          {showInicioTimePicker && (
            <DateTimePicker
              value={fechaInicioDate}
              mode="time"
              display="default"
              onChange={onInicioTimeChange}
            />
          )}

          {showFinDatePicker && (
            <DateTimePicker
              value={fechaFinDate}
              mode="date"
              display="default"
              onChange={onFinDateChange}
            />
          )}

          {showFinTimePicker && (
            <DateTimePicker
              value={fechaFinDate}
              mode="time"
              display="default"
              onChange={onFinTimeChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
