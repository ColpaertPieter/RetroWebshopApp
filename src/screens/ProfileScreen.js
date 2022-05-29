import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-native-elements";

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
        }}
      />
      <View style={styles.userContainer}>
        <View>
          <Text style={styles.userProps}>Naam</Text>
          <Text style={styles.userProps}>Email</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userText}>{user?.displayName}</Text>
          <Text style={styles.userText}>{user?.email}</Text>
        </View>
      </View>

      <Button
        buttonStyle={styles.button}
        title="Log uit"
        onPress={() => logout()}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderWidth: 0.2,
  },
  userContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userProps: {
    fontFamily: "roboto-regular",
    fontSize: 16,
  },
  userText: {
    fontFamily: "roboto-bold",
    textAlign: "right",
    fontSize: 16,
  },
  button: {
    margin: 5,
    backgroundColor: "green",
  },
});
