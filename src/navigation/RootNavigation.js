import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigator from "./TabBarNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase"
import {
  setAuthenticatedFalse,
  setAuthenticatedTrue,
} from "../../store/auth/slice";

const RootNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthenticatedTrue());
      } else {
        dispatch(setAuthenticatedFalse());
      }
    });

    return () => subscription();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabBarNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
