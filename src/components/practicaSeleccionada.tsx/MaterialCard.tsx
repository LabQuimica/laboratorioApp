import React from "react";
import { View, Text } from "react-native";
import { Material } from "@/src/types/practicas";

interface MaterialCardProps {
  material: Material;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1 mr-3">
          {material.nombre}
        </Text>
        <View className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1">
          <Text className="text-blue-700 dark:text-blue-300 text-sm font-medium">
            x{material.cantidad}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        {material.especial && (
          <View className="bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1">
            <Text className="text-amber-700 dark:text-amber-300 text-xs font-medium">
              {material.especial}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
