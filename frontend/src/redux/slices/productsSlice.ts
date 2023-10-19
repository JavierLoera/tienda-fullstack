import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { GetProductsResponse, Product } from "./Types/productsTypes";
import { initialState } from "./Types/productsTypes";
import { dataGetProductsByCategory } from "../../types/ProductType";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "products",
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

export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<GetProductsResponse>("/");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      throw rejectWithValue(error);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "fetch/product",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await API.get<Product>(`/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      throw rejectWithValue(error);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "fetch/productsByCategory",
  async (dataTosend: dataGetProductsByCategory, { rejectWithValue }) => {
    try {
      const { data } = await API.get<{ products: Product[]; total: number }>(
        `/category/${dataTosend.categoryId}?page=${dataTosend.page}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      throw rejectWithValue(error);
    }
  }
);

const Productsslice = createSlice({
  name: "products",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    selectNewCategory: (state) => {
      state.productsCategorySelected = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productsList = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsList = [];
      state.loading = false;
      state.msgError = action.error.message || "Algo ha salido mal";
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.productById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.msgErrorProduct = action?.error?.message || "Algo ha salido mal";
    });
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (
        state,
        action: PayloadAction<{ products: Product[]; total: number }>
      ) => {
        state.productsCategorySelected = [
          ...state.productsCategorySelected,
          ...action.payload.products,
        ];
        state.loading = false;
      }
    );
  },
});

export default Productsslice.reducer;
export const { incrementPage, selectNewCategory } = Productsslice.actions;
