import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Input, Button } from "react-native-elements";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const image = {
  uri: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geen geldig emailadres")
    .required("Email is verplicht"),
  password: Yup.string().required("Wachtwoord is verplicht"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  // Referentie aanmaken
  const passwordRef = useRef(null);

  const { login } = useAuth();

  const createAlert = (err) => {
    Alert.alert("Fout bij het inloggen", err, [
      {
        text: "Ok",
        onPress: () => console.log("Ok button is geklikt"),
      },
      {
        text: "Geen account",
        onPress: () => navigation.replace("Register"),
      },
    ]);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password).catch((err) =>
        createAlert(err.code)
      );
    },
  });

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.ownerShopName}>
            <Text style={styles.shopName}>RetroWebshop</Text>
            <Text style={styles.owner}>By Colpaert Pieter</Text>
          </View>
          <Text style={styles.header}>Login</Text>
          <Input
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            errorMessage={formik.errors?.email}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            style={styles.input}
            ref={passwordRef}
            placeholder="Wachtwoord"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            errorMessage={formik.errors?.password}
          />
          <Button
            containerStyle={{ alignSelf: "flex-end" }}
            type="clear"
            title="Nog geen account?"
            titleStyle={styles.btnTitleStyle}
            onPress={() => navigation.replace("Register")}
          />
          <Button
            containerStyle={{ alignSelf: "stretch", marginVertical: 8 }}
            buttonStyle={{ backgroundColor: "red" }}
            title="Login"
            titleStyle={{
              fontFamily: "roboto-bold",
            }}
            onPress={formik.handleSubmit}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ownerShopName: {
    marginBottom: 50,
  },
  shopName: {
    fontFamily: "roboto-bold",
    fontSize: 36,
    color: "white",
    textAlign: "center",
  },
  owner: {
    fontFamily: "roboto-italic",
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    color: "white",
    fontSize: 28,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
  },
  btnTitleStyle: {
    color: "red",
    fontFamily: "roboto-bold",
  },
});
