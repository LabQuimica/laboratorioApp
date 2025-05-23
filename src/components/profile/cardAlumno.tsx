import { View, Text, TouchableOpacity } from "react-native";
import { ValeAlumnoDetails } from "@/src/types/vale";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "@/src/components/ui/Badge";
import DowloadAlumno from "../pdf/DowloadAlumno";

export const CardAlumno = ({ vale }: { vale: ValeAlumnoDetails }) => {
  const [materialesVisible, setMaterialesVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="overflow-hidden  mb-4 ">
      {/* Encabezado con información principal */}
      <View className="p-4 ">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-lg text-black dark:text-white">
            Vale #{vale.id_vale}
          </Text>
          <Badge
            variant={vale.estado_vale.toLowerCase() as "progreso" | "pendiente"}
            label={vale.estado_vale}
          />
        </View>

        <Text className="mb-1 text-gray-600 dark:text-gray-300">
          Solicitado: {vale.fecha_solicitadaVale}
        </Text>
      </View>

      {/* Información de la práctica */}
      <View className="px-4 py-2 ">
        <Text className="font-medium text-gray-800 dark:text-gray-200">
          Práctica: {vale.practica.nombre_practica}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          Semestre: {vale.practica.nombre_semestre} ({vale.practica.semestre})
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          Profesor: {vale.practica.nombre_profesor}
        </Text>
      </View>

      {/* Observaciones */}
      {vale.observaciones_vale && (
        <View className="px-4 py-2  ">
          <Text className="font-medium mb-1 text-gray-800 dark:text-gray-200">
            Observaciones:
          </Text>
          <Text className="text-gray-600 dark:text-gray-300">
            {vale.observaciones_vale || "Sin observaciones"}
          </Text>
        </View>
      )}

      {/* Botón para mostrar/ocultar materiales */}
      <TouchableOpacity
        onPress={() => setMaterialesVisible(!materialesVisible)}
        className="flex-row justify-between items-center px-4 py-2 "
      >
        <Text className="font-medium text-gray-800 dark:text-white">
          Materiales ({vale.practica.materiales.length})
        </Text>
        {materialesVisible ? (
          <Ionicons
            name="chevron-up"
            size={24}
            color={isDark ? "white" : "black"}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            size={24}
            color={isDark ? "white" : "black"}
          />
        )}
      </TouchableOpacity>

      {/* Lista de materiales (desplegable) */}
      {materialesVisible && (
        <View className="px-4 py-2 bg-white dark:bg-background-dark">
          {vale.practica.materiales.map((material, index) => (
            <View
              key={`${material.nombre_item}-${index}`}
              className={`py-3 ${
                index < vale.practica.materiales.length - 1
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }`}
            >
              <View className="flex-row justify-between">
                <Text className="font-medium text-black dark:text-white">
                  {material.nombre_item}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">
                  Cant: {material.cantidad_solicitada}
                </Text>
              </View>

              <Text className="text-gray-500 dark:text-gray-400">
                Tipo: {material.tipo_item}
              </Text>

              {material.observacion_item && (
                <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Observación: {material.observacion_item || "Sin observación"}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      <DowloadAlumno id={vale.id_vale.toString()} />
    </View>
  );
};
