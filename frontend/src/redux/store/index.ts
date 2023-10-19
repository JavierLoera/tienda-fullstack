import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productsSlice";
import CartReducer from "../slices/CartSlice";
import UserReducer from "../slices/UserSlice";
import AuthReducer from "../slices/AuthSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: CartReducer,
    users: UserReducer,
    auth: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
