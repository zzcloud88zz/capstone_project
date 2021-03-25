import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

const API_ALLITEMS = "https://zzcloud88zz.pythonanywhere.com/items";

export default function BarcodeScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [item, setItem] = useState([]);
  const [allitems, setAllitems] = useState([]);
  const Outlet = route.params.Outlet;

  // Update const variable "allitems" whenever back button in Cart is pressed.
  useEffect(() => {
    if (route.params.cart > [0]) {
      setAllitems(route.params.cart)
    }
    else {
      setAllitems([])
    }
  }, [route.params.cart]);

  // Back to Home Screen button at top left
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => BacktoHome()}>
          <Text style={{ color: "skyblue", fontSize: 18, padding: 10 }}>Home</Text>
        </TouchableOpacity>
      ),
    });
  });

  // Back to Home Screen function
  function BacktoHome() {
    Alert.alert(
      "Are you sure you want to leave?",
      "Any pending items in cart will be emptied.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {navigation.navigate("Home")}
      }],
      { cancelable: false }
    );
  }

  // Go to cart icon button on header right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 10 }}>
          <Entypo
            name="shopping-cart"
            size={32}
            color="black"
            onPress={() => navigation.navigate("Cart", { allitems, Outlet })}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Barcode scanner
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Scanned item handler
  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    // Get data back from Flask using barcode
    axios.get(API_ALLITEMS + "/" + data)
    .then(response => {
      response.data.quantity = 1 // Push a default quantity = 1 into Json Obj to be used for quantity counter in Cart
      if ([allitems.filter(allitems=>allitems.barcode == response.data.barcode)] > [0]) {
        Alert.alert(
          "Item already in cart!",
          "Go to your Cart to change quantity",
          [
            { text: "OK", onPress: () => console.log('OK Pressed')}
          ],
          { cancelable: false }
        );
      }
      else {
      alert(`Item added to cart!`);
      setItem(response.data)
      setAllitems([...allitems, response.data])
      }
    })
    .catch(error => {
      console.log(error)
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./images/Scanner.jpg")} style={styles.image}>
        {/* Outlet */}
        <Text style={styles.outlet}>{Outlet}</Text>
        {/* Scanner */}
        <View style={styles.scannerframe}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
        </View>
          <View style={styles.scanagain}>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
        <View style={styles.itemframe}>
          <Text style={styles.itemtitle}>Item</Text>
          <Text style={styles.item}>{"\n"}
            product: {item.product}{"\n"}{"\n"}
            price: ${item.price}{"\n"}
          </Text>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 0.8,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  outlet: {
    padding: 10,
    backgroundColor: "whitesmoke",
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 110,
    paddingRight: 110,
  },
  scannerframe: {
    margin: 5,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "skyblue",
    height: "45%",
  },
  scanner: {
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  scanagain: {
    backgroundColor: "maroon"
  },
  itemframe: {
    alignItems: "center",
    backgroundColor: "beige",
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  itemtitle: {
    textDecorationLine: "underline",
    fontSize: 24,
  },
  item: {
    fontSize: 18,
  },
  addbutton: {
    backgroundColor: "red",
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 10,
  },
  addbuttontext: {
    fontSize: 24,
    fontWeight: "bold",
  },
});