import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import CartStackNavigator from "./CartStackNavigator";
import ProductStackNavigator from "./ProductStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../store/cart/slice";

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [getTotalPrice()]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "darkblue" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Producten"
        component={ProductStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather size={size} color={color} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Winkelmandje"
        component={CartStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather size={size} color={color} name="shopping-cart" />
          ),
          tabBarBadge:
            cartState.quantity > 0 ? <Text>{cartState.quantity}</Text> : null,
        }}
      />
      <Tab.Screen
        name="Profiel"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: "darkblue" },
          headerTintColor: "white",
          tabBarIcon: ({ size, color }) => (
            <Feather size={size} color={color} name="user" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarNavigator;

const styles = StyleSheet.create({});
