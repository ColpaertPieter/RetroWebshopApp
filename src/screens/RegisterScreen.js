import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const image = {
  uri: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Voor- en achternaam zijn verplicht"),
  email: Yup.string()
    .email("Geen geldig emailadres")
    .required("Email is verplicht"),
  password: Yup.string().required("Wachtwoord is verplicht").min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Wachtwoorden komen niet overeen")
    .required(),
});

const RegisterScreen = () => {
  const navigation = useNavigation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // REGISTER Methode van firebase oproepen
      register(values.name, values.email, values.password).catch((err) =>
        console.log(err)
      );
    },
  });

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50}
          style={styles.container}
        >
          <View style={styles.ownerShopName}>
            <Text style={styles.shopName}>RetroWebshop</Text>
            <Text style={styles.owner}>By Colpaert Pieter</Text>
          </View>
          <Text style={styles.header}>Registreer</Text>
          <Input
            style={styles.input}
            placeholder="Volledige naam"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            errorMessage={formik.errors?.name}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            errorMessage={formik.errors?.email}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <Input
            ref={passwordRef}
            style={styles.input}
            placeholder="Wachtwoord"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            errorMessage={formik.errors?.password}
            onSubmitEditing={() => repeatPasswordRef.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={repeatPasswordRef}
            style={styles.input}
            placeholder="Herhaal wachtwoord"
            secureTextEntry
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            errorMessage={formik.errors?.confirmPassword}
            returnKeyType="next"
          />
          <Button
            containerStyle={{ alignSelf: "flex-end" }}
            titleStyle={styles.btnTitleStyle}
            title="Al een account?"
            type="clear"
            onPress={() => navigation.replace("Login")}
          />
          <Button
            containerStyle={{ alignSelf: "stretch", marginVertical: 8 }}
            buttonStyle={{ backgroundColor: "red" }}
            title="Registreer"
            titleStyle={{ fontFamily: "roboto-bold" }}
            onPress={formik.handleSubmit}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
