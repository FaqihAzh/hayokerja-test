import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

const TransactionListScreen = ({ navigation }) => {
  const transactions = useSelector((state) => state.transactions);

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = moment(transaction.timestamp).format("YYYY-MM-DD");

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  const groupedArray = Object.keys(groupedTransactions).map((date) => ({
    date,
    data: groupedTransactions[date],
  }));

  return (
    <FlatList
      data={groupedArray}
      keyExtractor={(item) => item.date}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.dateHeader}>
            {moment(item.date).format("dddd, MMMM D, YYYY")}
          </Text>

          {item.data.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("TransactionDetail", {
                  transactionId: transaction.id,
                })
              }
            >
              <Text style={styles.title}>Transaction ID: {transaction.id}</Text>
              <Text style={styles.totalItems}>
                Total Items: {transaction.items.length}
              </Text>
              <Text style={styles.total}>
                Total: ${transaction.total.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 3 },
  totalItems: { fontSize: 12, color: "#777", marginBottom: 3 },
  total: { fontSize: 14, fontWeight: "bold", color: "#FF8C00", marginTop: 5 },
});

export default TransactionListScreen;
