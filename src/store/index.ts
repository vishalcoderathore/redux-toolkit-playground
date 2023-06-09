import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { configureStore } from '@reduxjs/toolkit';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Combined reducer function wrapping up smaller reducers
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(albumsApi.middleware).concat(photosApi.middleware),
});

// RootState provides TypeScript with information about the shape of your redux state, which allows it to infer the type of state
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the dispatch function
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

// Export the store
export { store };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi';
export { useAddPhotoMutation, useFetchPhotosQuery, useRemovePhotoMutation } from './apis/photosApi';
