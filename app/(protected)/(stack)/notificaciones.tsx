import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useNewPracticas } from '@/src/hooks/practicas';
import { Practica } from '@/src/types/practicas';
import { useAuthStore } from '@/src/stores/auth';

export default function Notificaciones() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: practicas, isLoading, isError } = useNewPracticas(user?.id_user);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPractica, setSelectedPractica] = useState<Practica | null>(null);

  const getInitials = (grupo: string) => {
    return grupo
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handlePress = (practica: Practica) => {
    setSelectedPractica(practica);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPractica(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading || !user) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Cargando notificaciones...</Text>
      </View>
    );
  }

  if (isError || !practicas) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-red-500">Error al cargar las prácticas.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 pt-10">
      <Text className="text-white text-4xl font-bold mb-4">
        Notificaciones
      </Text>
      
      <FlatList
        data={practicas}
        keyExtractor={(item) => item.id_practica.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} className="mb-3 pl-5">
            <View className="flex-row items-center space-x-4">
              <View className="bg-black w-12 h-12 justify-center items-center mr-5 rounded-full">
                <Text className="text-white font-bold text-sm">
                  {getInitials(item.grupo_nombre)}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-lg">Nueva práctica</Text>
                <Text className="text-gray-300 text-sm">{item.nombre}</Text>
              </View>
            </View>
            <View className="border-b border-gray-700 mt-3" />
          </TouchableOpacity>
        )}
      />

      {/* Modal de Detalles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-neutral-800 rounded-lg mx-4 p-6 w-11/12 max-h-4/5">
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedPractica && (
                <>
                  {/* Header del Modal */}
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-xl font-bold flex-1">
                      Detalles de la Práctica
                    </Text>
                    <TouchableOpacity
                      onPress={closeModal}
                      className="bg-gray-600 rounded-full w-8 h-8 justify-center items-center"
                    >
                      <Text className="text-white font-bold">×</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Información del Grupo */}
                  <View className="flex-row items-center mb-4">
                    <View className="bg-black rounded-full w-12 h-12 justify-center items-center mr-3">
                      <Text className="text-white font-bold">
                        {getInitials(selectedPractica.grupo_nombre)}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-white font-semibold text-lg">
                        {selectedPractica.grupo_nombre}
                      </Text>
                      <Text className="text-gray-400 text-sm">Grupo</Text>
                    </View>
                  </View>

                  {/* Detalles de la Práctica */}
                  <View className="space-y-3">
                    <View>
                      <Text className="text-gray-400 text-sm mb-1">Nombre de la práctica</Text>
                      <Text className="text-white text-base font-medium">
                        {selectedPractica.nombre}
                      </Text>
                    </View>

                    {selectedPractica.descripcion && (
                      <View>
                        <Text className="text-gray-400 text-sm mb-1">Descripción</Text>
                        <Text className="text-white text-base">
                          {selectedPractica.descripcion}
                        </Text>
                      </View>
                    )}

                    {selectedPractica.fecha_creacion && (
                      <View>
                        <Text className="text-gray-400 text-sm mb-1">Fecha de creación</Text>
                        <Text className="text-white text-base">
                          {formatDate(selectedPractica.fecha_creacion)}
                        </Text>
                      </View>
                    )}

                    {selectedPractica.fecha_fin && (
                      <View>
                        <Text className="text-gray-400 text-sm mb-1">Fecha límite</Text>
                        <Text className="text-white text-base">
                          {formatDate(selectedPractica.fecha_fin)}
                        </Text>
                      </View>
                    )}

                    {selectedPractica.status && (
                      <View>
                        <Text className="text-gray-400 text-sm mb-1">Estado</Text>
                        <View className="flex-row">
                          <View className={`px-2 py-1 rounded ${
                            selectedPractica.status === 'progreso' ? 'bg-green-600' : 
                            selectedPractica.status === 'pendiente' ? 'bg-yellow-600' : 
                            'bg-primary'
                          }`}>
                            <Text className="text-white text-sm capitalize">
                              {selectedPractica.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Botones de Acción */}
                  <View className="flex-row space-x-3 mt-6">
                    <TouchableOpacity
                      onPress={closeModal}
                      className="flex-1 bg-[#272E4B] py-3 rounded-lg"
                    >
                      <Text className="text-white text-center font-semibold">
                        Cerrar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}