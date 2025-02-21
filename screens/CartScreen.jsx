import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, clearCart, removeFromCart } from "../store/cartSlice";
import { addTransaction } from "../store/transactionSlice";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import CustomModal from "../components/CustomModal";

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePayment = () => {
    if (cart.length === 0) {
      setModalVisible(false);
      return;
    }
    setModalVisible(true);
  };

  const confirmPayment = () => {
    const transaction = {
      id: Date.now().toString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      timestamp: new Date().toISOString(),
    };
    dispatch(addTransaction(transaction));
    dispatch(clearCart());
    setModalVisible(false);
    navigation.navigate("Transactions");
  };

  const handleRemove = (id) => {
    setSelectedItem(id);
    setRemoveModalVisible(true);
  };

  const confirmRemove = () => {
    dispatch(removeFromCart(selectedItem));
    setRemoveModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrease={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                onDecrease={() => {
                  if (item.quantity > 1) {
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    );
                  }
                }}
                onRemove={() => handleRemove(item.id)}
              />
            )}
          />
          <View style={styles.footer}>
            <CheckoutButton onPress={handlePayment} />
          </View>
        </>
      )}

      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmPayment}
        title="Confirm Payment"
        message="Are you sure you want to proceed with the payment?"
      />

      <CustomModal
        isVisible={isRemoveModalVisible}
        onClose={() => setRemoveModalVisible(false)}
        onConfirm={confirmRemove}
        title="Remove Item"
        message="Are you sure you want to remove this item from the cart?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  footer: {
    paddingTop: 10,
    alignItems: "center",
    width: "100%",
  },
});

export default CartScreen;
