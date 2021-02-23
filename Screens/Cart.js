import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Cart({ route }) {
    const [items, setItem] = useState([route.params]);

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
                <Text>hahaha{item.product}</Text>
            </View>
        );
    }

  return (
    <View style={styles.container}>
        <FlatList
            data={items}
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