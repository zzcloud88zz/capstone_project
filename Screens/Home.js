import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("./images/Home.jpg")} style={styles.image}>
        <View style={styles.welcomebox}>
          <Text style={styles.welcomemsg}>Welcome!</Text>
          <Text style={styles.welcomemsg}>Tap on the one of following outlet to start your shopping!</Text>
        </View>
          <Text>{"\n"}</Text>

          {/* Hougang Mall Outlet */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Barcode Scanner", { Outlet: "Hougang Mall" })}>
            <Text style={styles.outlet}>Hougang Mall</Text>
          </TouchableOpacity>
          <Text>{"\n"}</Text>

          {/* Punngol Waterway point Outlet */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Barcode Scanner", { Outlet: "Waterway Point" })}>
            <Text style={styles.outlet}>Waterway Point</Text>
          </TouchableOpacity>
          <Text>{"\n"}</Text>

          {/* Serangoon Nex Outlet */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Barcode Scanner", { Outlet: "Serangoon Nex" })}>
            <Text style={styles.outlet}>Serangoon Nex</Text>
          </TouchableOpacity>
          <Text>{"\n"}</Text>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  welcomebox: {
    backgroundColor: "#f5f5f5",
  },
  welcomemsg: {
    fontSize: 24,
    textAlign: "center",
    padding: 5,
  },
  button: {
    backgroundColor: "lightblue",
  },
  outlet: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    color: "grey",
  },
});