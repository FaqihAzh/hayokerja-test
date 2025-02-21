import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 230,
    display: "flex",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green" },
});

export default ProductCard;
