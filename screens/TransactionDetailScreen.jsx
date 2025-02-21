import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

const TransactionDetailScreen = ({ route }) => {
  const { transactionId } = route.params;
  const transactions = useSelector((state) => state.transactions);
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Transaction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>Transaction ID: {transaction.id}</Text>
      <Text style={styles.date}>
        Date: {moment(transaction.timestamp).format("dddd, MMMM D, YYYY HH:mm")}
      </Text>
      <FlatList
        data={transaction.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>
              {item.title} x{item.quantity}
            </Text>
            <Text style={styles.itemTitle}>x{item.quantity}</Text>
            <Text style={styles.itemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${transaction.total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  detailTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  date: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  itemCard: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  itemTitle: { fontSize: 14 },
  itemPrice: { fontSize: 12, color: "gray" },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FF8C00",
    marginTop: 5,
  },
});

export default TransactionDetailScreen;
