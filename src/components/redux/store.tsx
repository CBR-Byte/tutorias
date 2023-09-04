import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from './states/userSlice'
import { storage } from "../redux/states/userSlice";
import {subjectSlice} from './states/subjectSlice';
import { tutorSlice } from './states/tutorSlice';

const storeData = async (value: any) => {
  try {
    await storage.set('data', {token: JSON.stringify(value?.access_token), refresh: JSON.stringify(value?.refresh_token), email: JSON.stringify(value?.user.email)}); // Guardar el valor en el almacenamiento local
    const data = await storage.get('data'); // Recuperar el valor del almacenamiento local
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
  try {
    await storage.remove('data');
  } catch (e) {
    console.log(e);
  }
};

const updateAccessToken = async (value: any) => {
  try {
    const data = await storage.get('data');
    
    data.token = JSON.stringify(value?.access_token)
    await storage.set('data', data); 
  } catch (error) {
    console.log(error)
  }
}
const loginMiddleware = (store:any) => (next:any) => (action:any) => {
  if (action.type === 'user/login/fulfilled' || action.type === 'user/signUp/fulfilled') {

    storeData(action.payload);
  }
  return next(action);
};

const refresh= (store:any) => (next:any) => (action:any) => {
  if (action.type === 'user/tokenRef/fulfilled') {

    updateAccessToken(action.payload);
  }
  return next(action);
};


const logoutMiddleware = (store:any) => (next:any) => (action:any) => {
  if (userSlice.actions.logOut.match(action) || action.type === 'user/tokenRef/rejected' || action.type === 'user/deleteAccount/fulfilled') {
    deleteData();
  }
  return next(action);
};


export const store = configureStore({
  reducer: {user : userSlice.reducer, subject : subjectSlice.reducer, tutor : tutorSlice.reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginMiddleware, logoutMiddleware,refresh),
  devTools: true,
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch