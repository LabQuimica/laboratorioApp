import React, { useState } from "react";
import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useValesAlumno } from "@/src/hooks/useValesAlumno";
import { ValeAlumnoDetails } from "@/src/types/vale";

export const ValesAlumnoList = ({ userId }: { userId: number }) => {
  const { data, isLoading, isError, error, refetch } = useValesAlumno(userId);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">
          Error al cargar los vales: {error?.message}
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500 text-center">
          No se encontraron vales para este alumno.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ zIndex: 1 }}>
      <FlashList
        data={data}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]}
            progressBackgroundColor="#ffffff"
            tintColor="#0000ff"
            title="Actualizando..."
            titleColor="#0000ff"
          />
        }
        renderItem={({ item }: { item: ValeAlumnoDetails }) => (
          <View className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Text className="font-bold text-gray-800 dark:text-gray-200">
              {item.id_vale}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {item.estado_vale}
            </Text>
            <Text className="font-bold text-gray-800 dark:text-gray-200">
              {item.email_alumno}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {item.fecha_fin}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {item.fecha_inicio}
            </Text>
            <Text className="font-bold text-gray-800 dark:text-gray-200">
              {item.fecha_solicitadaVale}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {item.nombre_alumno}
            </Text>
            <Text className="font-bold text-gray-800 dark:text-gray-200">
              {item.observaciones_vale}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {item.practica.nombre_practica}
            </Text>
          </View>
        )}
        keyExtractor={(item: ValeAlumnoDetails) => item.id_vale.toString()}
      />
    </View>
  );
};
