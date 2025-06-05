import MateriaCard from "@/src/components/MateriaCard";
import { useGruposByUsuario } from "@/src/hooks/grupos";
import { useAuthStore } from "@/src/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const getInitials = (name: string | undefined) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function Home() {
  const { user, logout } = useAuthStore();
  const { data: grupos, isLoading, error } = useGruposByUsuario(user?.id_user);

  const router = useRouter();
  const handleAddPress = () => {
    router.push("/asignar");
  };

  const handleNotifications = () => {
    router.push("/notificaciones");
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <Text className="text-white">Error al cargar las materias</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark p-8">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-4xl font-bold">Materias</Text>
        {user?.rol == "alumno" && (
          <TouchableOpacity
            onPress={handleNotifications}
            className="bg-primary p-3 rounded-full"
          >
            <Ionicons name="notifications" size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        {grupos?.map((materia, index) => (
          <MateriaCard
            key={index}
            nombre={materia.nombre}
            siglas={getInitials(materia.nombre)}
            color="#000000"
            onPress={() =>
              router.push({
                pathname: "/practicas-materia",
                params: { nombre: materia.nombre, id_grupo: materia.id_grupo },
              })
            }
          />
        ))}
      </ScrollView>

      {user?.rol === "profesor" && (
        <TouchableOpacity
          onPress={handleAddPress}
          className="absolute w-16 h-16 align-middle justify-center items-center right-5 bottom-10 rounded-full bg-primary elevation-md"
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
