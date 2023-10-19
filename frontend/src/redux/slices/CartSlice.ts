import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  incremetDecrementPayload,
  deleteProductType,
  initialState,
  item,
} from "./Types/cartTypes";

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<item>) => {
      const isInCart = state.cartItems.findIndex(
        (elem) => elem.id === action.payload.id
      );
      if (isInCart === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[isInCart] = {
          ...state.cartItems[isInCart],
          quantity:
            state.cartItems[isInCart].quantity + action.payload.quantity,
        };
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementDecrement: (
      state,
      action: PayloadAction<incremetDecrementPayload>
    ) => {
      const indexArticle = state.cartItems.findIndex(
        (elem) => elem.id === action.payload.id
      );
      if (action.payload.type === "increment") {
        state.cartItems[indexArticle].quantity += 1;
      }
      if (action.payload.type === "decrement") {
        state.cartItems[indexArticle].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    deleteProduct: (state, action: PayloadAction<deleteProductType>) => {
      const indexArticle = state.cartItems.findIndex(
        (elem) => elem.id === action.payload.id
      );
      state.cartItems.splice(indexArticle, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    openDrawer: (state) => {
      state.isCartDrawer = !state.isCartDrawer;
    },
  },
});

export default CartSlice.reducer;
export const { addItemCart, incrementDecrement, deleteProduct, openDrawer } =
  CartSlice.actions;
