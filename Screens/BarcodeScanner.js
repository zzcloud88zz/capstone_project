import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const API_ALLITEMS = "https://zzcloud88zz.pythonanywhere.com/items";

export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState([]);
  const [barcode, setBarcode] = useState([]);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState([]);

  // Cart icon button on header right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 10 }}>
          <Entypo
            name="shopping-cart"
            size={32}
            color="black"
            onPress={() => navigation.navigate("Cart", { id, barcode, product, price })}
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

  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    alert(`Bar code type ${type} - barcode ${data} scanned!`);

    axios.get(API_ALLITEMS + "/" + data) // Get data back from Flask using barcode
    .then(response => {
      console.log(response)
      setId(data);
      setBarcode(data);
      setProduct(response.data.product)
      setPrice(response.data.price)
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
      <View style={styles.scannerframe}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View style={styles.itemframe}>
        <Text style={styles.itemtitle}>Item</Text>
        <Text style={styles.item}>{"\n"}
          barcode: {barcode}{"\n"}
          product: {product}{"\n"}
          price: ${price}{"\n"}{"\n"}
        </Text>

        <TouchableOpacity style={ styles.addbutton } onPress={() => navigation.navigate("Cart", { id, barcode, product, price })}>
          <Text style={ styles.addbuttontext }>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#652121",
    opacity: 0.8,
  },
  scannerframe: {
    margin: 10,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "skyblue",
  },
  scanner: {
    padding: 170,
    paddingBottom: 200,
  },
  itemframe: {
    alignItems: "center",
    backgroundColor: "#fffff2",
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  itemtitle: {
    textDecorationLine: "underline",
    fontSize: 30,
  },
  item: {
    fontSize: 20,
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