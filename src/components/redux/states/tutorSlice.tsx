/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { path } from "../../../services";
import axios from "axios";
import { User } from "./userSlice";
import { refreshToken } from "./userSlice";

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
>("tutor/getTutors", async (data, thunkAPI) => {
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
>("tutor/getAllTutors", async (data, thunkAPI) => {
  try {
    const response = await axios.get(`${path}/users/tutores?keywords=`);
    const users = await response.data;
    return users;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.response.data.detail,
    });
  }
});

export const updateOpinions = createAsyncThunk<
  any,
  any,
  { rejectValue: { errorMessage: string } }
>("tutor/updateOpinions", async (data, thunkAPI) => {
  const state = thunkAPI.getState() as { user: User; tutor: Tutor };
  try {
    const id = data.id;
    const { access_token } = state.user;
    delete data.id;
    const response = await axios.patch(`${path}/users/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const tokenRefresh = state.user.refresh_token;
    if (
      error.response?.data.detail === "El token de acceso ha expirado" ||
      error.response?.data.detail === "JWTDecodeError"
    ) {
      thunkAPI.dispatch(refreshToken({ refresh_token: tokenRefresh }));
      return thunkAPI.rejectWithValue({
        errorMessage:
          "Hubo un error al actualizar los datos, por favor intente de nuevo",
      });
    }
    return thunkAPI.rejectWithValue({
      errorMessage:
        "Hubo un error al actualizar los datos, por favor intente de nuevo",
    });
  }
});

export const tutorSlice = createSlice({
  name: "tutors",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTutors.fulfilled, (state, action) => {
      state.tutors = action.payload;
    });
    builder.addCase(updateOpinions.fulfilled, (state, action) => {
      const { tutors } = state;
      const index = tutors.findIndex((tutor: any) => tutor.id === action.payload.id);
      const new_opinions = {
        id: action.payload.id,
        name: action.payload.name,
        availability: action.payload.availability,
        format_tutor: action.payload.format_tutor,
        cost_tutor: action.payload.cost_tutor,
        type_tutor: action.payload.type_tutor,
        method_tutor: action.payload.method_tutor,
        type_group_tutor: action.payload.type_group_tutor,
        tutor_opinions: action.payload.tutor_opinions,
        subjects_tutor: action.payload.subjects_tutor,
        image_url: action.payload.image_url,
      };
      tutors[index] = new_opinions;
      state.tutors = tutors;
    });
  },
});

export default tutorSlice.reducer;
