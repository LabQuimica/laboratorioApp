import { View, Text, TouchableOpacity } from "react-native";
import { ValeProfesorDetails } from "@/src/types/vale";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUpdateStatusPracticaAsignada } from "@/src/hooks/practicas";
import DowloadProfesor from "../../pdf/DowloadProfesor";
import { ModificarFechasModal } from "./ModificarFechasModal";
import { BadgeSelector } from "./BadgeSelector";

export const CardProfesor = ({ vale }: { vale: ValeProfesorDetails }) => {
  const [materialesVisible, setMaterialesVisible] = useState(false);
  const [modalFechasVisible, setModalFechasVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="overflow-hidden  mb-4 ">
      {/* Encabezado con información principal */}
      <View className="p-4 ">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-lg text-black dark:text-white">
            Vale #{vale.id_practica_asignada}
          </Text>
          <BadgeSelector
            currentStatus={vale.status_practica}
            idPracticaAsignada={vale.id_practica_asignada}
            useMutationHook={useUpdateStatusPracticaAsignada}
          />
        </View>

        <View className=" border-gray-200 dark:border-gray-600 pt-4 space-y-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                <Text className="font-semibold">Fecha de inicio: </Text>
                {vale.fecha_inicio}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalFechasVisible(true)}
              className="ml-2 p-1"
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={isDark ? "#60a5fa" : "#3b82f6"}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                <Text className="font-semibold">Fecha de fin: </Text>
                {vale.fecha_fin}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalFechasVisible(true)}
              className="ml-2 p-1"
            >
              <Text className="text-blue-500 text-xs font-medium">
                Modificar fechas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Información de la práctica */}
      <View className="px-4 py-2 ">
        <Text className="font-medium text-gray-800 dark:text-gray-200">
          Práctica: {vale.nombre_practica}
        </Text>
        <Text className=" text-gray-600 dark:text-gray-300">
          Grupo: {vale.nombre_grupo}
        </Text>
        <Text className=" text-gray-600 dark:text-gray-300">
          Semestre: {vale.semestre_grupo}
        </Text>
      </View>

      {/* Botón para mostrar/ocultar materiales */}
      <TouchableOpacity
        onPress={() => setMaterialesVisible(!materialesVisible)}
        className="flex-row justify-between items-center px-4 py-2 "
      >
        <Text className="font-medium text-gray-800 dark:text-white">
          Materiales ({vale.materiales.length})
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
          {vale.materiales.map((material, index) => (
            <View
              key={`${material.nombre_item}-${index}`}
              className={`py-3 ${
                index < vale.materiales.length - 1
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }`}
            >
              <View className="flex-row justify-between">
                <Text className="font-medium text-black dark:text-white">
                  {material.nombre_item}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">
                  Cant. Total: {material.cantidad_total_necesaria}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500 dark:text-gray-400">
                  Tipo: {material.tipo_item}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">
                  Cant. Unitaria: {material.cantidad_unitaria}
                </Text>
              </View>
              <Text className="text-gray-500 dark:text-gray-400">
                Ubicacion: {material.ubicacion}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400">
                Característica: {material.especial}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400">
                Observación: {material.observacion || "Sin observación"}
              </Text>
            </View>
          ))}
        </View>
      )}
      <DowloadProfesor id={vale.id_practica_asignada.toString()} />

      {/* Modal para modificar fechas */}
      <ModificarFechasModal
        visible={modalFechasVisible}
        onClose={() => setModalFechasVisible(false)}
        fechaInicio={vale.fecha_inicio}
        fechaFin={vale.fecha_fin}
        idPracticaAsignada={vale.id_practica_asignada}
      />
    </View>
  );
};
