import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const ProductScreen = (props) => {
  const { navigation } = props;

  const products = require("../../assets/Products/Product.json");

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate("ProductDetails", { item: item })}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <Text style={styles.price}>{item.price}€</Text>
        </View>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  imageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  image: {
    justifyContent: "center",
    height: 200,
    width: 260,
  },
  price: {
    top: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    textAlign: "center",
    color: "blue",
  },
  description: {
    fontFamily: "roboto-regular",
    margin: 10,
  },
});
