import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../screens/ProductScreen";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "darkblue",
      },
    }}>
      <Stack.Screen name="ProductenLijst" component={ProductScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;

const styles = StyleSheet.create({});
