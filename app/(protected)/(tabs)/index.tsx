import MateriaCard from "@/src/components/MateriaCard";
import { useGruposByAlumno } from "@/src/hooks/grupos";
import { useAuthStore } from "@/src/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
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
  return <View className="flex-1 bg-background dark:bg-background-dark"></View>;
}
