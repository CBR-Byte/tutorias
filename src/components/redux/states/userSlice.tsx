/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Storage } from "@ionic/storage";

export const storage = new Storage();

const createStorage = async () => {
  await storage.create();
};
createStorage();

export interface User {
  status: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  isLoading?: boolean;
  registerCompleted: boolean;
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
  is_student: string | boolean;
};

const initialState: User = {
  status: "",
  access_token: "",
  refresh_token: "",
  token_type: "",
  isLoading: false,
  registerCompleted: false,
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

export const uploadImage = createAsyncThunk<
  any,
  any,
  { rejectValue: MyErrorType }
>("user/uploadImage", async (data, thunkAPI) => {
  const token = storage.get("access_token");
  const email = storage.get("email");
  const img = data.image;
  console.log(data);
  // try {
  //   const response = await axios.post(
  //     `https://tutoriapp-7f467dd740dd.herokuapp.com/blobs/upload/${email}`)
  // } catch (error: any) {
  //   return thunkAPI.rejectWithValue({
  //     errorMessage: error.response.data.detail,
  //   });
  // }
});


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
      `https://tutoriapp-7f467dd740dd.herokuapp.com/users/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token_access}`,
        },
      }
    );
    return {
      access_token: token_access,
      refresh_token: token_refresh,
      status: "success",
      user: response.data,
    };
  } catch (err: any) {
    thunkAPI.dispatch(refreshToken({ refresh_token: data.refresh }));
    //return thunkAPI.rejectWithValue({ errorMessage: err.response.data.detail });
  }
});

export const changePassword = createAsyncThunk<
  any,
  any,
  { rejectValue: MyErrorType }
>("user/changePassword", async (data, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as User;
    const token = state.user.access_token;
    const email = state.user.user.email;
    const response = await axios.post(
      `https://tutoriapp-7f467dd740dd.herokuapp.com/change_password/auth/${email}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
});

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as User;
      const token = state.user.access_token;
      const id = state.user.user.id;
      const response = await axios.delete(
        `https://tutoriapp-7f467dd740dd.herokuapp.com/users/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.detail,
      });
    }
  }
);

export const refreshToken = createAsyncThunk<
  any,
  any,
  { rejectValue: MyErrorType }
>("user/tokenRef", async (token, thunkAPI) => {
  try {
    const refresh = JSON.parse(token.refresh_token);

    const response = await axios.post(
      `https://tutoriapp-7f467dd740dd.herokuapp.com/users/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      }
    );
    return {
      refresh_token: refresh,
      access_token: response.data.access_token,
      user: response.data.user,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
});

export const updateUserInfo = createAsyncThunk<
  any,
  any,
  { rejectValue: MyErrorType }
>("user/updateUserInfo", async (data, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as User;
    const { id } = state.user.user;
    const { access_token } = state.user;
    console.log(data);
    const response = await axios.patch(
      `https://tutoriapp-7f467dd740dd.herokuapp.com/users/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.data.detail === "El token de accesso ha expirado") {
      const tokenRefresh = await storage.get(data.refresh_token);
      thunkAPI.dispatch(refreshToken({ refresh_token: tokenRefresh }));
    }

    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
});

export const onLogin = createAsyncThunk<
  any,
  loginCredentials,
  { rejectValue: MyErrorType }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://tutoriapp-7f467dd740dd.herokuapp.com/users/login",
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
  if (data.is_tutor === "false") {
    data.is_student = true;
    data.is_tutor = false;
  } else {
    data.is_tutor = true;
  }

  if (data.is_student === "false") {
    data.is_student = false;
  } else {
    data.is_student = true;
  }

  delete data.passwordConfirmation;

  try {
    const response = await axios.post(
      "https://tutoriapp-7f467dd740dd.herokuapp.com/users/create",
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
    changeLoading: (state, action) => {
      state.isLoading = action.payload.value;
    },
    logOut: (state) => {
      state.status = "";
      state.access_token = "";
      state.refresh_token = "";
      state.token_type = "";
      state.isLoading = false;
      state.registerCompleted = true;
      state.errorRegister = false;
      state.errorLogin = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    changeRegisterCompleted: (state) => {
      state.registerCompleted = true;
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
        state.isAuthenticated = true;
        state.isLoading = false;
        state.registerCompleted = true;
        state.errorLogin = false;
        state.user = action.payload.user;
      })
      .addCase(onLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogin = true;
        state.errorMessage = action.payload?.errorMessage;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = action.payload.token_type;
        state.errorMessage = "";
        state.isAuthenticated = true;
        state.isLoading = false;
        state.registerCompleted = false;
        state.errorRegister = false;
        state.user = action.payload.user;
      })
      .addCase(onSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(onSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRegister = true;
        state.errorMessage = action.payload?.errorMessage;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = "bearer";
        state.errorMessage = "";
        state.isAuthenticated = true;
        state.isLoading = false;
        state.registerCompleted = true;
        state.errorRegister = false;
        state.user = action.payload.user;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        //alert(action.payload?.errorMessage);
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = "bearer";
        state.status = "success";
        state.errorMessage = "";
        state.isLoading = false;
        state.isAuthenticated = true;
        state.registerCompleted = true;
        state.errorRegister = false;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        console.log(action.payload?.errorMessage);
        state = initialState;
        state.errorMessage = action.payload?.errorMessage;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.errorRegister = true;
        state.errorMessage = "Datos actualizados correctamente";
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.errorMessage = action.payload?.message;
        state.isLoading = false;
        state.errorRegister = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.errorMessage;
        state.errorRegister = true;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = "";
        state.access_token = "";
        state.refresh_token = "";
        state.token_type = "";
        state.isLoading = false;
        state.registerCompleted = true;
        state.errorRegister = false;
        state.errorLogin = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const {
  changeErrorLogin,
  changeErrorRegister,
  logOut,
  changeRegisterCompleted,
  changeLoading,
} = userSlice.actions;
export default userSlice.reducer;
