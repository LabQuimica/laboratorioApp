import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/src/stores/auth";
import ThemeSelector from "@/src/components/selector/themeSelector";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      {user && <Text style={styles.subtitle}>{user.name}</Text>}
      <Text> {user?.date} </Text>
      <Text> {user?.active} </Text>
      <Text> {user?.codigo} </Text>
      <Text> {user?.img} </Text>
      <Text> {user?.email} </Text>
      <Text> {user?.img} </Text>

      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Apariencia
        </Text>
        <ThemeSelector />
      </View>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          ¡Has iniciado sesión correctamente! Esta es tu área personal.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  content: {
    flex: 1,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#DC3545",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
