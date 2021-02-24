import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Cart({ route }) {
    const [cart, setCart] = useState(route.params.allitems);
    console.log(cart);

    // The function to render each row in our FlatList
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
                }}
            >
                <Text>{item.product}</Text>
                {/* Delete button */}
                <TouchableOpacity onPress={() => deleteItem(item.barcode)} style={{ paddingLeft: 15 }}>
                  <MaterialCommunityIcons name="delete-empty" size={44} color="maroon" />
                </TouchableOpacity>
            </View>
        );
    }

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
              const refresh = cart.filter(cart=>cart.barcode !== barcode)
              setCart(refresh)
          }
        }],
        { cancelable: false }
      );
    }

  return (
    <View style={styles.container}>
        <FlatList
            data={cart}
            renderItem={renderItem}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.barcode}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  carttitle: {
    textDecorationLine: "underline",
    fontSize: 32,
    fontWeight: "bold",
  },
});