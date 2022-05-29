import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Voor- en achternaam zijn verplicht"),
  email: Yup.string()
    .email("Geen geldig emailadres")
    .required("Email is verplicht"),
  street: Yup.string().required("Straat is verplicht"),
  houseNumber: Yup.string().required("Huisnummer is verplicht"),
  zipCode: Yup.number("Postcode kan enkel cijfer bevatten").required(
    "Postcode is verplicht"
  ),
  city: Yup.string().required("Gemeente is verplicht"),
});

const ConfirmScreen = () => {
  const navigation = useNavigation();
  // Referentie naar input
  const emailRef = useRef(null);
  const streetRef = useRef(null);
  const houseNumberRef = useRef(null);
  const zipCodeRef = useRef(null);
  const cityRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
    },
    validationSchema: validationSchema,
  });
  const makeOrder = () => {};

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={200}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputView}>
          <Input
            style={styles.input}
            placeholder="Naam"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            errorMessage={formik.errors?.name}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Input
            style={styles.input}
            ref={emailRef}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            errorMessage={formik.errors?.email}
            onSubmitEditing={() => streetRef.current.focus()}
            returnKeyType="next"
            keyboardType="email-address"
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Input
            style={styles.input}
            placeholder="Straat"
            value={formik.values.street}
            onChangeText={formik.handleChange("street")}
            errorMessage={formik.errors?.street}
            onSubmitEditing={() => houseNumberRef.current.focus()}
            returnKeyType="next"
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Input
            style={styles.input}
            placeholder="Huisnummer"
            value={formik.values.houseNumber}
            onChangeText={formik.handleChange("houseNumber")}
            errorMessage={formik.errors?.houseNumber}
            onSubmitEditing={() => zipCodeRef.current.focus()}
            returnKeyType="next"
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Input
            style={styles.input}
            placeholder="Postcode"
            value={formik.values.zipCode}
            onChangeText={formik.handleChange("zipCode")}
            errorMessage={formik.errors?.zipCode}
            onSubmitEditing={() => cityRef.current.focus()}
            returnKeyType="next"
            keyboardType="number-pad"
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Input
            style={styles.input}
            placeholder="Gemeente"
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
            errorMessage={formik.errors?.city}
            inputContainerStyle={{
              borderWidth: 0,
              borderColor: "transparent",
            }}
          />
          <Button
            buttonStyle={styles.button}
            title="Bevestigen"
            onPress={() => makeOrder()}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    justifyContent: "space-around",
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
  },
});
