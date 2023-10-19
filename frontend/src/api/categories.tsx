import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "products",
  headers: { "Content-Type": "application/json" },
});

export const getCategories = async () => {
  const { data } = await API.get<Array<{ id: number; name: string }>>(
    "/categories"
  );
  return data;
};
