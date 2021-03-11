import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ImageBackground, Button } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export default function Cart({ route, navigation }) {
    const Outlet = route.params.Outlet;
    const [cart, setCart] = useState(route.params.allitems);
    const [deleted, setDeleted] = useState([]);

    // Back button at top left
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity style={{ paddingRight: 10 }}>
            <Entypo
              onPress={() => navigation.navigate("Barcode Scanner", { deleted })}
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
                Price: ${(item.price*item.quantity).toFixed(2)}
                </Text>
                {/* Increment button */}
                <Button onPress={() => increment(item)} title="+"></Button>
                  <Text>
                    Quantity: {item.quantity}
                  </Text>
                {/* Decrement button */}
                <Button onPress={() => decrement(item)} title="-"></Button>
                {/* Delete button */}
                <TouchableOpacity onPress={() => deleteItem(item.barcode)} style={{ paddingLeft: 15 }}>
                  <MaterialCommunityIcons name="delete-empty" size={44} color="black" />
                </TouchableOpacity>
            </View>
        );
    }

    // Increment quantity counter
    function increment(item) {
      item.quantity = item.quantity + 1
      setCart(cart.filter(cart=>cart.quantity !== 0))
    }

    // Decrement quantity counter
    function decrement(item) {
      item.quantity = item.quantity - 1
      setCart(cart.filter(cart=>cart.quantity !== 0))
    }

    // delete function
    function deleteItem(barcode) {
      Alert.alert(
        "Hold On!",
        "Are you sure you want to delete?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancelled"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            setDeleted(barcode)
            setCart(cart.filter(cart=>cart.barcode !== barcode))
          }
        }],
        { cancelable: false }
      );
    }
    
    // Total price calculation
    let initialValue = 0
    const totalPrice = (cart.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price*currentValue.quantity
    }, initialValue)).toFixed(2)

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./images/Cart.jpg")} style={styles.image}>
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
              <TouchableOpacity style={styles.paybutton} onPress={() => navigation.navigate("Payment", { cart, totalPrice })}>
                <Text style={styles.paybuttontext}>Pay</Text>
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