import { useEffect } from "react";
import "./App.css";
import { fetchProducts } from "./redux/slices/productsSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/store/hooks";
import ProductsList from "./components/products/ProductsList";
import Navbar from "./components/NavBar/Navbar";
import ProductDetails from "./components/products/ProductDetails";
import CartPage from "./components/Cart/CartPage";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import { isLogged } from "./redux/slices/AuthSlice";
import Admin from "./components/Admin/Admin";
import "@tremor/react/dist/esm/tremor.css";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Categories from "./components/Categories/Categories";
import Account from "./components/Admin/Account";
import Comprar from "./components/Orden/Comprar";

function App() {
  const dispatch = useAppDispatch();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(!!userData && userData?.user?.role === "admin");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(isLogged());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/comprar" element={<Comprar />} />

          {/* Rutas protegidas solo para admin */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAllowed={!!userData && userData?.user?.role === "admin"}
                redirectTo="/login"
              />
            }
          >
            <Route path="admin" element={<Admin />}>
              <Route path="account" element={<Account />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Route>

          {/* ruta not found */}
          <Route path="*" element={<>404</>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
