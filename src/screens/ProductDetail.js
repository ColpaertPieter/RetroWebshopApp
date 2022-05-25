import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { addProduct } from "../../store/cart/slice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.itemContainer}>
        <View>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <Text style={styles.price}>{item.price}€</Text>
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
      <Button
        buttonStyle={styles.button}
        title="Voeg toe"
        onPress={() => dispatch(addProduct(item))}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    margin: 10,
  },
  image: {
    maxWidth: "100%",
    height: 200,
  },
  price: {
    position: "absolute",
    top: 150,
    right: 0,
    backgroundColor: "darkblue",
    fontWeight: "900",
    fontSize: 24,
    color: "white",
    padding: 5,
  },
  title: {
    color: "darkorange",
    fontSize: 28,
    fontFamily: "roboto-bold",
    textAlign: "center",
  },
  description: {
    fontFamily: "roboto-regular",
    fontSize: 22,
  },
  button: {
    backgroundColor: "green",
    margin: 10,
    borderRadius: 5,
  },
});
