/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  status: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  error: boolean;
  isAuthenticated: boolean;
  user?: any;
}

const initialState: User = {
  status: "",
  access_token: "",
  refresh_token: "",
  token_type: "",
  error: false,
  isAuthenticated: false,
  user: null,
};

export interface loginCredentials {
  email: string;
  password: string;
}

export const onLogin = createAsyncThunk(
  "user/login",
  async (credentials: loginCredentials, thunkAPI) => {
    const response = await axios.post('http://127.0.0.1:8000/users/login', credentials);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<User>) => {
    //   return {
    //     status: action.payload.status,
    //     access_token: action.payload.access_token,
    //     refresh_token: action.payload.refresh_token,
    //     token_type: action.payload.token_type,
    //     isAuthenticated: true,
    //     user: action.payload.user,
    //   };
    // },
    logOut: (state) => {
      state.status = "";
      state.access_token = "";
      state.refresh_token = "";
      state.token_type = "";
      state.error = false
      state.isAuthenticated = false;
      state.user = null;
    },
    changeError: (state) => {
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = action.payload.token_type;
        state.error = false
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.error = true;
        console.log(action.error.message);
      });
  },
});

export const { changeError, logOut } = userSlice.actions;
export default userSlice.reducer;
