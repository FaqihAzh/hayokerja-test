import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    transactions: transactionReducer,
  },
});
