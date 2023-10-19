import axios from "axios";
import { ProductType } from "../types/ProductType";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "products",
  headers: { "Content-Type": "application/json" },
});

export const getNewProducts = async () => {
  const { data } = await API.get<ProductType[]>("/new-products");
  return data;
};

export const getTrendingProducts = async () => {
  const { data } = await API.get<ProductType[]>("/trending");
  return data;
};
