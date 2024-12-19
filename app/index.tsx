import { getStoredToken } from "@/src/auth/SecureStore";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import { Pressable, Text, View, Image } from "react-native";

export default function App() {
  const colorScheme = useColorScheme() || Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getStoredToken();
      if (token) {
        router.replace("/main");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#000" : "#f5f5f5",
        paddingTop: 40, // Ajuste para evitar superposición con la barra de estado
      }}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} hidden={false} />

      {/* Contenido principal */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start", // Cambia la alineación
          alignItems: "center",
        }}
      >
        {/* Texto de Bienvenida */}
        <Text
          style={{
            fontSize: 48, // Letras grandes para "Bienvenid@"
            fontWeight: "bold",
            color: isDarkMode ? "#fff" : "#000",
            marginTop: 210, // Desplaza hacia abajo
          }}
        >
          Bienvenid@
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 10, // Más separación entre "Bienvenid@" y este texto
            marginBottom: 40, // Más separación entre este texto y los botones
            color: isDarkMode ? "#ccc" : "#666",
            textAlign: "center",
          }}
        >
          App de laboratorio de química
        </Text>

        {/* Botones */}
        <Link href="/login" asChild>
          <Pressable
            style={{
              backgroundColor: "#3D539F",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 25, // Más redondeado
              marginBottom: 20, // Más separación entre botones
              width: "55%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión
            </Text>
          </Pressable>
        </Link>

        <Link href="/register" asChild>
          <Pressable
            style={{
              backgroundColor: "#3D539F",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 25, // Más redondeado
              width: "55%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Registrarse
            </Text>
          </Pressable>
        </Link>
      </View>

      {/* Imagen en la parte inferior */}
      <Image
        source={require("../assets/bienvenida.png")}
        style={{
          width: "100%",
          height: 280, // Imagen ligeramente más pequeña
          resizeMode: "contain",
          alignSelf: "center",
          marginTop: 20, // Asegura que quede separada del contenido superior
        }}
      />
    </View>
  );
}
