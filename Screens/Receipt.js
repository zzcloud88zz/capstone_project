import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ImageBackground, Button } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export default function Receipt({ route, navigation }) {
    const Outlet = route.params.Outlet;
    const cart = route.params.cart;
    const totalPrice = route.params.totalPrice;

    console.log(route.params.Outlet);
    console.log(route.params.cart);
    console.log(route.params.totalPrice);

    // Back button at top left
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity style={{ paddingRight: 10 }}>
            <Entypo
              onPress={() => navigation.navigate("Home")}
              name="back"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        ),
      });
    });

    // The function to render each item in FlatList
    function renderItem({ item }) {
        return (
            <View
                style={{
                padding: 10,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                opacity: 0.8,
                }}
            >
                <Text>
                Item: {item.product}{"\n"}
                Quantity: {item.quantity}{"\n"}
                Price: ${(item.price*item.quantity).toFixed(2)}
                </Text>
            </View>
        );
    }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./images/Receipt.jpg")} style={styles.image}>
        {/* Outlet */}
        <Text style={styles.outlet}>{Outlet}</Text>
          <FlatList
              data={cart}
              renderItem={renderItem}
              style={{ width: "100%" }}
              keyExtractor={(item) => item.barcode}
          />
          <View style={styles.payment}>
              <Text style={styles.totalprice}>
                Total: ${totalPrice}
              </Text>
            { cart == "" ? (
              <Text></Text>
            ) : (
              <TouchableOpacity style={styles.paybutton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.paybuttontext}>Back to Home</Text>
              </TouchableOpacity>
            )}
          </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  outlet: {
    padding: 10,
    backgroundColor: "grey",
    fontSize: 20,
    textAlign: "center",
  },
  carttitle: {
    textDecorationLine: "underline",
    fontSize: 32,
    fontWeight: "bold",
  },
  payment: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  totalprice: {
    fontSize: 20,
  },
  paybutton: {
    backgroundColor: "lightgreen",
    padding: 20,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 5,
  },
  paybuttontext: {
    fontSize: 18,
  },
});