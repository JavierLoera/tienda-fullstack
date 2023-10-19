import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import {
  initialState,
  createUserResponse,
  createUserRequest,
} from "./Types/userTypes";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "user",
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

export const RegisterUser = createAsyncThunk(
  "register/user",
  async (dataToSend: createUserRequest, { rejectWithValue }) => {
    try {
      const { data } = await API.post<createUserResponse>("/", dataToSend);
      return data;
    } catch (error: any) {
      if (!error?.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RegisterUser.rejected, (state, action: any) => {
      state.loading = false;
      state.msgError = action?.payload?.message;
    });
    builder.addCase(RegisterUser.fulfilled, (state) => {
      state.loading = false;
      state.msgError = "";
      state.msgSuccess = "Genial,ahora puede iniciar sesion";
    });
  },
});

export default UserSlice.reducer;
