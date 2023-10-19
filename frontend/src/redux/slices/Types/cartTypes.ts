export type item = {
  id: number;
  quantity: number;
  name: string;
  description: string;
  image: string;
  price: number;
  fullImagePath: string;
};

export type initialStateType = {
  cartItems: item[];
  isCartDrawer: boolean;
};

export type deleteProductType = {
  id: number;
};

export type incremetDecrementPayload = {
  id: number;
  type: "increment" | "decrement";
};

const cart = localStorage.getItem("cart");
export const initialState: initialStateType = {
  cartItems: cart ? JSON.parse(cart) : [],
  isCartDrawer: false,
};
