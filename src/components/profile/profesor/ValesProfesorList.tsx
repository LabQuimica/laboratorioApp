import React, { useState } from "react";
import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ValeAlumnoDetails, ValeProfesorDetails } from "@/src/types/vale";
import { CardAlumno } from "../alumno/cardAlumno";
import { useValesProfesor } from "@/src/hooks/useValesProfesor";
import { CardProfesor } from "./cardProfesor";

export const ValesProfesorList = ({
  userId,
}: {
  userId: number | undefined;
}) => {
  const { data, isLoading, isError, error, refetch } = useValesProfesor(userId);
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
        renderItem={({ item }: { item: ValeProfesorDetails }) => (
          <CardProfesor vale={item} />
        )}
        keyExtractor={(item: ValeProfesorDetails) =>
          item.id_practica_asignada.toString()
        }
      />
    </View>
  );
};
