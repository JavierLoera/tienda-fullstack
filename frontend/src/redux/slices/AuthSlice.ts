import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dataUser, initialState, loginData } from "./Types/authTypes";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL! + "auth",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = createAsyncThunk(
  "login/user",
  async (loginData: loginData, { rejectWithValue }) => {
    try {
      const { data } = await API.post<dataUser>("/", loginData);
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error: any) {
      if (!error?.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.userAuth = null;
    },
    isLogged: (state) => {
      let userData = localStorage.getItem("userData");
      userData
        ? (state.userAuth = JSON.parse(userData))
        : (state.userAuth = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.msgError = undefined;
      state.userAuth = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.msgError = undefined;
    });
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.msgError = action?.payload?.message;
    });
  },
});

export default authSlice.reducer;
export const { isLogged, logout } = authSlice.actions;
