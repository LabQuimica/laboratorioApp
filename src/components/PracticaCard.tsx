import React from "react";
import { View, Text } from "react-native";
import { Calendar, Clock } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  nombre: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  status: "progreso" | "finalizado" | string;
}

export default function PracticaCard({ nombre, fecha, horaInicio, horaFin, status }: Props) {
  const isCompleted = status !== "progreso";

  return (
    <View className="mb-4 rounded-xl border p-4 border-primary">
      <View className="flex-row items-center mb-2 mr-7 pr-2">
        <View className="mr-3 rounded-full items-center justify-center">
          {isCompleted ? 
          <Ionicons name="ellipse" color="green" size={25}/> : 
          <Ionicons name="checkmark-circle-sharp" color="red"size={25}/> }
        </View>
        <Text className="text-white font-semibold text-xl">{nombre}</Text>
      </View>
      <View className="flex-row items-center gap-2 mb-3 pl-10">
        <Calendar color="white" size={18} />
        <Text className="text-white text-sm">{fecha}</Text>
      </View>
      <View className="flex-row items-center gap-2 pl-10 mb-3">
        <Clock color="white" size={18} />
        <Text className="text-white text-sm">
          {horaInicio} — {horaFin}
        </Text>
      </View>
    </View>
  );
}