import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL_AVATARS;

// Avatar collections
const AVATAR_COLLECTIONS = [
  "adventurer-neutral",
  "lorelei-neutral",
  "notionists-neutral",
  "shapes",
  "thumbs",
];

export default function Avatars() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedCollection, setSelectedCollection] =
    useState("adventurer-neutral");
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const avatarListRef = useRef<FlatList>(null);

  // Generate the avatars for the selected collection
  useEffect(() => {
    setLoading(true);
    const paths = Array.from({ length: 10 }, (_, i) => {
      const num = String(i + 1).padStart(3, "0");
      return `${selectedCollection}/avatar-${num}.svg`;
    });
    setAvatars(paths);
    setLoading(false);
  }, [selectedCollection]);

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = () => {
    router.back();
    router.setParams({ selectedAvatar });
  };

  return (
    <View
      className="flex-1 bg-white dark:bg-neutral-900"
      style={{ paddingTop: insets.top }}
    >
      <StatusBar style="light" />

      {/* Drag Handle - Only place where sheet can be dismissed */}
      <View style={styles.dragHandleContainer}>
        <View style={styles.dragHandle} />
      </View>

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pb-4">
        <Text className="text-2xl font-bold text-black dark:text-white">
          Seleccionar Avatar
        </Text>
        <Pressable onPress={() => router.back()} className="p-2">
          <Ionicons name="close" size={24} color="#888" />
        </Pressable>
      </View>

      {/* Collections Selector */}
      <View className="px-4 pb-4">
        <FlatList
          data={AVATAR_COLLECTIONS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCollection(item)}
              className={`py-2 px-4 mr-2 rounded-full ${
                selectedCollection === item
                  ? "bg-primary"
                  : "bg-gray-200 dark:bg-neutral-800"
              }`}
            >
              <Text
                className={`${
                  selectedCollection === item
                    ? "text-white"
                    : "text-black dark:text-white"
                }`}
              >
                {item.replace("-neutral", "")}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Avatars Grid in a separate scrollable container */}
      <View className="flex-1 px-2">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            ref={avatarListRef}
            data={avatars}
            numColumns={3}
            scrollEventThrottle={16}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectAvatar(item)}
                className={`flex-1 aspect-square m-2 items-center justify-center rounded-lg ${
                  selectedAvatar === item
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-gray-100 dark:bg-neutral-800"
                }`}
              >
                <SvgUri width="80%" height="80%" uri={`${BASE_URL}${item}`} />
              </Pressable>
            )}
            keyExtractor={(item) => item}
          />
        )}
      </View>

      {/* Confirm Button */}
      <View className="p-4" style={{ paddingBottom: insets.bottom || 16 }}>
        <Pressable
          onPress={handleConfirm}
          disabled={!selectedAvatar}
          className={`py-4 rounded-xl items-center ${
            selectedAvatar ? "bg-primary" : "bg-gray-400"
          }`}
        >
          <Text className="text-white font-bold">Confirmar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dragHandleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
  },
  dragHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#CCCCCC",
  },
});
