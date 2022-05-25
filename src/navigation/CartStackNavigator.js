import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartScreen'
import ConfirmScreen from '../screens/ConfirmScreen'
import keyboardav from '../screens/keyboardav'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "darkblue",
      },
    }}>
        <Stack.Screen name='Cart' component={CartScreen} options={{title: 'Winkelmandje'}}/>
        <Stack.Screen name='Bevestig' component={ConfirmScreen} />
    </Stack.Navigator>
  )
}

export default CartStackNavigator

const styles = StyleSheet.create({})