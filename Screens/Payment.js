import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { PaymentView } from "./components/PaymentView";
import axios from "axios";

export default function Payment({ route, navigation}) {
  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const Outlet = route.params.Outlet;
  const cart = route.params.cart;
  const totalPrice = route.params.totalPrice;

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus("Please wait while confirming your payment!");
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    try {
      const stripeResponse = await axios.post("http://localhost:8000/payment", {
        email: "shengrong_88@hotmail.com",
        authToken: jsonResponse,
      });
      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus("Payment Success");
        } else {
          setPaymentStatus("Payment failed due to some issue");
        }
      } else {
        setPaymentStatus(" Payment failed due to some issue");
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(" Payment failed due to some issue");
      navigation.navigate("Receipt", { Outlet, cart, totalPrice })
    }
  };

  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 350,
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          <Text style={{ fontSize: 25, margin: 10 }}> Make Payment </Text>
          <Text style={{ fontSize: 20, margin: 10 }}>
            {" "}
            Amount Payable: ${totalPrice}{"\n"}
          </Text>
          <TouchableOpacity
            style={{
              height: 60,
              width: 300,
              backgroundColor: "lightgreen",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setMakePayment(true);
            }}
          >
            <Text style={{ color: "grey", fontSize: 20 }}>Proceed To Pay</Text>
          </TouchableOpacity>
        </View>
      );

      // show to make payment
    } else {
      if (response !== undefined) {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 25, margin: 10 }}> {paymentStatus} </Text>
            <Text style={{ fontSize: 16, margin: 10 }}> {response} </Text>
          </View>
        );
      } else {
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
          //product=
            amount={totalPrice}
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
        {paymentUI()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
});
