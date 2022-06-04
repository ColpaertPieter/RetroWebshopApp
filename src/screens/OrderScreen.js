import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../../hooks/useAuth";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { reset } from "../../store/cart/slice";

const OrderScreen = () => {
  const { user } = useAuth();
  const cartstate = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.list}>
          {item.qty}x {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.id}>
          Bedank voor uw bestelling met nummer: {uuidv4()}
        </Text>
        <Text style={styles.email}>
          Er werd een bevestigingsmail verstuurt naar {user?.email}!
        </Text>
        <Text style={styles.details}>Details van uw bestelling:</Text>
        <Text style={styles.total}>Totaal: €{cartstate.total}</Text>
        <FlatList
          style={{ marginBottom: 20 }}
          data={cartstate.items}
          keyExtractor={(item) => item.name}
          renderItem={cartItem}
        />
      </View>
      <Button
        title="Ok"
        buttonStyle={styles.button}
        onPress={() => {
          navigation.navigate("ProductenLijst");
          dispatch(reset());
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "50%",
  },
  id: {
    fontFamily: "roboto-regular",
    fontSize: 18,
    marginVertical: 5,
  },
  email: {
    fontFamily: "roboto-regular",
    fontSize: 18,
    marginVertical: 15,
  },
  details: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    marginVertical: 10,
  },
  total: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    marginVertical: 5,
  },
  list: {
    fontFamily: "roboto-bold",
    fontSize: 18,
  },
  button: {
    margin: 5,
    backgroundColor: "green",
    width: 200,
    alignSelf: "center",
  },
});
