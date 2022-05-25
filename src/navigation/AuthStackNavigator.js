import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})