import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Input } from "react-native-elements";

const ProductScreen = (props) => {
  const { navigation } = props;

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const products = require("../../assets/Products/Product.json");

  useEffect(() => {
    setFilteredDataSource(products);
    setMasterDataSource(products);
  }, []);

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

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
      <Input
        style={styles.searhInput}
        placeholder="Zoek hier..."
        onChangeText={(text) => searchFilter(text)}
        inputContainerStyle={{
          borderWidth: 0,
          borderColor: "transparent",
          // adding height makes the button not work on android for some reason
          // height: 0,
        }}
      />
      <FlatList
        data={filteredDataSource}
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
  searhInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
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
