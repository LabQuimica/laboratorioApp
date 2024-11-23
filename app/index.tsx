import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Button, Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 flex justify-center items-center">
      <StatusBar style="auto" />
      <Link href="/login" asChild>
        <Pressable>
          <Text className="text-blue-500 text-lg">Login</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable>
          <Text className="text-blue-500 text-lg">Register</Text>
        </Pressable>
      </Link>
    </View>
  );
}
