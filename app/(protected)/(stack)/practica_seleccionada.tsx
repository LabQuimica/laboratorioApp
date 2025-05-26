import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePracticasDetalle } from "@/src/hooks/practicas";
import { MaterialCard } from "@/src/components/MaterialCard";
import { PracticaHeader } from "@/src/components/PracticaHeader";

export default function PracticaSeleccionada() {
  const { practica, status } = useLocalSearchParams<{
    practica: string;
    status: string;
  }>();

  const { data, isLoading, error } = usePracticasDetalle(parseInt(practica));

  const handleInscribirme = () => {
    console.log("Inscribirme a la práctica");
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" className="text-blue-600" />
        <Text className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Cargando detalles de la práctica...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-6">
        <View className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
          <Text className="text-red-600 dark:text-red-400 text-lg font-semibold text-center">
            Error al cargar la práctica
          </Text>
          <Text className="text-red-500 dark:text-red-300 text-center mt-2">
            {error.message}
          </Text>
        </View>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <Text className="text-gray-600 dark:text-gray-300 text-lg">
          No se encontraron datos de la práctica
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header de la práctica */}
        <PracticaHeader practica={data} />

        {/* Sección de descripción */}
        <View className="mx-4 mb-6">
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Descripción
            </Text>
            <Text className="text-gray-700 dark:text-gray-300 leading-6">
              {data.descripcion}
            </Text>
          </View>
        </View>

        {/* Sección de materiales */}
        <View className="mx-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Materiales Requeridos ({data.materiales.length})
          </Text>

          {data.materiales.length > 0 ? (
            <View className="space-y-3">
              {data.materiales.map((material, index) => (
                <MaterialCard
                  key={`${material.id_item}-${index}`}
                  material={material}
                />
              ))}
            </View>
          ) : (
            <View className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <Text className="text-gray-500 dark:text-gray-400 text-center text-lg">
                No hay materiales requeridos para esta práctica
              </Text>
            </View>
          )}
        </View>
        {status === "pendiente" && (
          <View className="flex-1 bg-white dark:bg-gray-900">
            <TouchableOpacity
              onPress={handleInscribirme}
              className="m-4 p-4 bg-primary  rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                Inscribirme a la práctica
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
