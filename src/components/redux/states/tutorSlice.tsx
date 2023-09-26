/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Tutor {
    tutors: any;
}

const initialState: Tutor = {
    tutors: null,
    };
const  path = import.meta.env.VITE_PATH_BACKEND;

export const getTutors = createAsyncThunk<
  any,
  any,
  { rejectValue: { errorMessage: string } }
>("user/getTutors", async (data, thunkAPI) => {
  try {
    const keyWords = data.join(",");
    const response = await axios.get(
      `${path}/users/tutores?keywords=${keyWords}`
    );
    const users = await response.data;
    return users;
  } catch (error: any) {
    
    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
});

export const getAllTutors = createAsyncThunk<
  any,
  any,
  { rejectValue: { errorMessage: string } }
  >("user/getTutors", async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${path}/users/tutores?keywords=`
      );
      const users = await response.data;
      return users;
    } catch (error: any) {
      
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.detail,
      });
    }
  });

export const tutorSlice = createSlice({
  name: "tutors",
  initialState: 
    initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTutors.fulfilled, (state, action) => {
      state.tutors = action.payload;
    });
  },
});

export default tutorSlice.reducer;