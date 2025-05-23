import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useToast } from "@/src/contexts/ToastContext";

export default function DowloadAlumno({ id }: { id: string }) {
  const { showToast } = useToast();

  const handleOpenLink = async () => {
    const url = `http://192.168.1.91:3000/downloadVale?id=${id}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      showToast("Vale descargado correctamente", "success");
    } else {
      showToast("No se puede abrir la URL: " + url, "error");
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <TouchableOpacity
        onPress={handleOpenLink}
        className="m-4 p-4 bg-primary  rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          Descargar Vale
        </Text>
      </TouchableOpacity>
    </View>
  );
}
