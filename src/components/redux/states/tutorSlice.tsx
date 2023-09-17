/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Tutor {
    tutors: any;
}

const initialState: Tutor = {
    tutors: null,
    };

export const getTutors = createAsyncThunk<
  any,
  any,
  { rejectValue: { errorMessage: string } }
>("user/getTutors", async (data, thunkAPI) => {
  try {
    const keyWords = data.join(",");
    const response = await axios.get(
      `https://tutoriapp.azurewebsites.net/users/tutores?keywords=${keyWords}`
    );
    const users = await response.data;
    return users;
  } catch (error: any) {
    console.log(error);
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
    builder.addCase(getTutors.fulfilled, (state, action) => {
      state.tutors = action.payload;
    });
  },
});

export default tutorSlice.reducer;