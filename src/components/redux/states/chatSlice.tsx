import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MyErrorType, User } from "./userSlice";
import axios from "axios";
import { path } from "../../../services";


export const getHistorial = createAsyncThunk<
    any,
    any,
    { rejectValue: MyErrorType }
>("chat/getHistorial", async (id, thunkAPI) => {
 
  
    try {
        const response = await axios.get(
            `${path}/historial/user/${id}`
        );
        
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.detail,
        });
    }
});


export const getConversation = createAsyncThunk<
  any,
  void,
  { rejectValue: MyErrorType }
>("chat/getConversation", async (_, thunkAPI) => {
  
  try {
    
    const state = thunkAPI.getState() as User;
    const id = state.user.user.id;
    const response = await axios.get(
      `${path}/messages/${id}`
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
}
);

export const getListUsers = createAsyncThunk<
  any,
  any,
  { rejectValue: MyErrorType }
>("chat/getListUsers", async (id) => {
  try {
    const response = await axios.get(
      `${path}/users/userName/${id}`
    );
    const user = await response.data;
    return user;
  } catch (error: any) {
    
  }
});

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
      historial: []
       // historial: history? JSON.parse(history.historial) : [],
    },
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(getHistorial.fulfilled, (state, action) => {
            state.historial = action.payload.historial;
        });
        // builder.addCase(getConversation.fulfilled, (state, action) => {
        //   state.messages = action.payload;
        // });
    }
});


