/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  status: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  errorMessage?: string;
  errorRegister: boolean;
  errorLogin: boolean;
  isAuthenticated: boolean;
  user?: any;
}

interface MyErrorType {
  errorMessage: string;
}

export type dataUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  is_tutor: string | boolean;
};

const initialState: User = {
  status: "",
  access_token: "",
  refresh_token: "",
  token_type: "",
  errorMessage: "",
  errorLogin: false,
  errorRegister: false,
  isAuthenticated: false,
  user: null,
};

export interface loginCredentials {
  email: string;
  password: string;
}

export type token = {
  token: string;
  refresh: string;
  email: string;
};

export const verify = createAsyncThunk<
  any,
  token,
  { rejectValue: MyErrorType }
>("user/verify", async (data, thunkAPI) => {
  try {
    
    const token_access = JSON.parse(data.token);
    const token_refresh = JSON.parse(data.refresh);
    const email = JSON.parse(data.email);
    
    const response = await axios.get(
      `http://127.0.0.1:8000/users/${email}`,
      {headers: {
        'Authorization': `Bearer ${token_access}`
      }}
    );
    console.log(response.data);
    return {access_token: token_access, refresh_token: token_refresh, status: "success",user:response.data};
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ errorMessage: err.response.data.detail });
  }
});

export const onLogin = createAsyncThunk<
  any,
  loginCredentials,
  { rejectValue: MyErrorType }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/login",
      credentials
    );
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ errorMessage: err.response.data.detail });
  }
});

export const onSignUp = createAsyncThunk<
  any,
  dataUser,
  { rejectValue: MyErrorType }
>("user/signUp", async (data, thunkAPI) => {
  if (data.is_tutor === "true") {
    data.is_tutor = true;
  } else {
    data.is_tutor = false;
  }
  delete data.passwordConfirmation;

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/create",
      data
    );
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ errorMessage: err.response.data.detail });
  }
});

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
      state.errorRegister = false;
      state.errorLogin = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    changeErrorLogin: (state) => {
      state.errorLogin = false;
    },
    changeErrorRegister: (state) => {
      state.errorRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = action.payload.token_type;
        state.errorMessage = "";
        state.errorLogin = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.errorLogin = true;
        state.errorMessage = action.payload?.errorMessage;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = action.payload.token_type;
        state.errorMessage = "";
        state.errorRegister = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(onSignUp.rejected, (state, action) => {
        state.errorRegister = true;
        state.errorMessage = action.payload?.errorMessage;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = "bearer";
        state.errorMessage = "";
        state.errorRegister = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        
      })
      .addCase(verify.rejected, (state, action) => {
        alert(action.payload?.errorMessage);
      });
  },
});

export const { changeErrorLogin, changeErrorRegister, logOut } =
  userSlice.actions;
export default userSlice.reducer;
