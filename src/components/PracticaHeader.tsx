import React from "react";
import { View, Text } from "react-native";
import { PracticaDetails } from "@/src/types/practicas";

interface PracticaHeaderProps {
  practica: PracticaDetails;
}

export const PracticaHeader: React.FC<PracticaHeaderProps> = ({ practica }) => {
  return (
    <View className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 mx-4 mt-4 mb-6 rounded-xl p-6 shadow-lg">
      <View className="mb-4 pt-12 flex-row justify-between items-start">
        <Text className="text-2xl font-bold text-white mb-2 flex-1 mr-3">
          {practica.nombre}
        </Text>
        <View className="bg-white/20 rounded-full px-3 py-1 flex-shrink-0 items-center">
          <Text className="text-white text-sm font-medium">
            Numero: {practica.id_practica}
          </Text>
        </View>
      </View>

      <View className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            <Text className="font-semibold">Creada:</Text>{" "}
            {practica.fecha_creacion}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            <Text className="font-semibold">Modificada:</Text>
            {practica.fecha_modificacion}
          </Text>
        </View>
      </View>
    </View>
  );
};
