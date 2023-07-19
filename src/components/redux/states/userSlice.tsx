import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
    status : string,
    access_token : string,
    refresh_token : string,
    token_type : string,
    isAuthenticated : boolean,
    user? : any
}

const initialState : User = {
        status : "",
        access_token : "",
        refresh_token : "",
        token_type : "",
        isAuthenticated : false,
        user : null
    }

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login : (state, action: PayloadAction<User> ) => {
            return {    
                status: action.payload.status,
                access_token : action.payload.access_token,
                refresh_token : action.payload.refresh_token,
                token_type : action.payload.token_type,
                isAuthenticated : true,
                user : action.payload.user,
            }
        },
                
    },
})

export const { login } = userSlice.actions;
export default userSlice.reducer;