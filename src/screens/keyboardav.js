import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import React from "react";
  
  const KeyboardAvoiding = () => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.largeTitle}>KeyboardAvoiding</Text>
        <View style={styles.inputView}>
          <Text style={styles.redView}>Title</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default KeyboardAvoiding;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    inputView: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around",
    },
    largeTitle: {
      fontSize: 20,
      marginVertical: 16,
    },
    redView: {
      backgroundColor: "red",
      marginVertical: 16,
    },
    textInput: {
      borderWidth: 2,
      fontSize: 20,
      padding: 8,
      marginBottom: 36,
    },
  });