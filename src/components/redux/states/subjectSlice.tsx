/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userSlice } from "./userSlice";
import { AppDispatch } from "../store";

interface Subject {
  subjects: string[];
}

const path = import.meta.env.VITE_PATH_BACKEND;

export const getSubjects = createAsyncThunk<
  Subject,
  void,
  { dispatch: AppDispatch }
>("user/getSubjects", async (_, thunkAPI) => {
  thunkAPI.dispatch(userSlice.actions.changeLoading({ value: true }));

  try {
    const response = await axios.get(
      `${path}/subjects`
    );
    const subjectNames = Object.values(response.data).map(
      (subject: any) => subject.name
    );

    thunkAPI.dispatch(userSlice.actions.changeLoading({ value: false }));
    return { subjects: subjectNames.sort() };
  } catch (err) {
    thunkAPI.dispatch(userSlice.actions.changeLoading({ value: false }));
    return { subjects: [] };
  }
});

export const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
  } as Subject,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload.subjects;
    });
  },
});
