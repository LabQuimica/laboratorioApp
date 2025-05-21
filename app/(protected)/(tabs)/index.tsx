import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <WebView
        className="flex-1"
        source={{ uri: "http://192.168.1.91:3000/downloadVale?id=2" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowFileAccess={true}
        allowFileDownload={true}
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
}
