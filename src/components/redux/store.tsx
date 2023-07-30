import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from './states/userSlice'
import { Storage } from "@ionic/storage";
import { log } from 'console';

export const storage = new Storage();
await storage.create();

const storeData = async (value: any) => {
  try {
    await storage.set('data', {token: JSON.stringify(value?.access_token), refresh: JSON.stringify(value?.refresh_token), email: JSON.stringify(value?.user.email)}); // Guardar el valor en el almacenamiento local
    const data = await storage.get('data'); // Recuperar el valor del almacenamiento local
    console.log(data);
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

const loginMiddleware = (store:any) => (next:any) => (action:any) => {
  if (action.type === 'user/login/fulfilled' || action.type === 'user/signUp/fulfilled') {
    console.log(action.payload)
    storeData(action.payload);
  }
  return next(action);
};

const logoutMiddleware = (store:any) => (next:any) => (action:any) => {
  if (userSlice.actions.logOut.match(action)) {
    deleteData();
  }
  return next(action);
};


export const store = configureStore({
  reducer: {user : userSlice.reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginMiddleware, logoutMiddleware),
  devTools: true,
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch