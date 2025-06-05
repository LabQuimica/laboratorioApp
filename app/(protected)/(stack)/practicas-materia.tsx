import PracticaCard from "@/src/components/PracticaCard";
import { usePracticasPorGrupo } from "@/src/hooks/practicas";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Ionicons } from "@expo/vector-icons";

export default function PracticasMateria() {
  const { nombre, id_grupo } = useLocalSearchParams();

  const { data: practicas, isLoading } = usePracticasPorGrupo(Number(id_grupo));

  return (
     <View className="flex-1 bg-background dark:bg-background-dark p-8">
      <Text className="text-white text-3xl font-bold mb-10">{nombre}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading && <Text className="text-white">Cargando prácticas...</Text>}
        {practicas?.map((p) => (
          <PracticaCard
            key={p.id_practica}
            nombre={p.nombre}
            fecha={format(new Date(p.fecha_inicio), "d 'de' MMMM yyyy", { locale: es })}
            horaInicio={format(new Date(p.fecha_inicio), "hh:mm a")}
            horaFin={format(new Date(p.fecha_fin), "hh:mm a")}
            status={p.status}
          />
        ))}
      </ScrollView>
    </View>
  );
}