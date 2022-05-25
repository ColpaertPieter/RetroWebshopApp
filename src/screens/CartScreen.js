import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removeProduct, getTotalPrice } from "../../store/cart/slice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, []);

  const cartItem = ({ item }) => {
    return (
      <View style={styles.cartContainer}>
        <Text style={styles.quantity}>{item.qty}x</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>€{item.price * item.qty}</Text>
        <TouchableOpacity
          style={styles.remove}
          onPress={() => dispatch(removeProduct(item))}
        >
          <Feather size={24} color="red" name="delete" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartState.items}
        keyExtractor={(item) => item.name}
        renderItem={cartItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyCart}>Geen producten aanwezig</Text>
        )}
      />
      <View style={styles.totalButton}>
        <Text style={styles.total}>Totaal: €{cartState.total}</Text>
        <Button
          buttonStyle={styles.button}
          title="Bestellen"
          onPress={() => navigation.navigate("Bevestig")}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cartContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 20,
    padding: 5,
  },
  title: {
    fontSize: 20,
    padding: 5,
    fontFamily: "roboto-bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "right",
    padding: 5,
  },
  remove: {
    padding: 5,
  },
  emptyCart: {
    paddingTop: 150,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  totalButton: {
    bottom: 5,
  },
  total: {
    fontFamily: 'roboto-bold',
    fontSize:22,
    textAlign: "right",
    margin: 5,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: "green",
  },
});
