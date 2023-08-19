import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userSlice } from "./userSlice";
import { AppDispatch } from "../store";

interface Subject {
    subjects: string[];
}
  
export const getSubjects = createAsyncThunk<Subject, void, { dispatch: AppDispatch }>(
    "user/getSubjects",
    async (_, thunkAPI) => {
      thunkAPI.dispatch(userSlice.actions.changeLoading({ value: true }));
  
      try {
        const response = await axios.get("https://tutoriapp-7f467dd740dd.herokuapp.com/subjects");
        const subjectNames = Object.values(response.data).map((subject: any) => subject.name);
  
        thunkAPI.dispatch(userSlice.actions.changeLoading({ value: false }));
        return { subjects: subjectNames };
      } catch (err) {
        console.log(err);
        thunkAPI.dispatch(userSlice.actions.changeLoading({ value: false }));
        return { subjects: [] };
      }
    }
  );

export const subjectSlice = createSlice({
    name: "subject",
    initialState :  {
        subjects: [],
    } as Subject,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getSubjects.fulfilled, (state, action) => {
            state.subjects = action.payload.subjects;
        });
    }
});
