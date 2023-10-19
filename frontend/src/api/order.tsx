import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import { useAppSelector } from "../redux/store/hooks";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "cart",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("userToken");
    if (token) {
      req.headers.Authorization = `Bearer ${JSON.parse(token)?.token}` || "";
    }
    return req;
  }
);

type userData = {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  calle: string;
  numeroInterior: string;
  colonia: string;
  pais: string;
  entreCalles: string;
  referencias: string;
};

export default async function (userData: userData) {
  const { cartItems } = useAppSelector((state) => state?.cart);
  const { data } = await API.post("/", { user: userData, cart: cartItems });
  return data;
}
