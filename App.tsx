import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState();

  async function fetchData() {
    try {
      const response = await fetch("http://192.XXXX:3000/user/2"); //colocar ip de la maquina donde esta corriendo el servidor
      const data = await response.json();
      setData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
