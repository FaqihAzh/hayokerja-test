import React from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { useProducts } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";

const ProductListScreen = () => {
  const { data, isLoading } = useProducts();
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    const message = `${item.title} added to cart`;
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", message);
    }
  };

  if (isLoading)
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );

  return (
    <FlatList
      data={data.products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard item={item} onPress={() => handleAddToCart(item)} />
      )}
      columnWrapperStyle={{ gap: 10, paddingHorizontal: 15 }}
      contentContainerStyle={{ gap: 10, paddingVertical: 15 }}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
});

export default ProductListScreen;
