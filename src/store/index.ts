import { usersReducer } from './slices/usersSlice';
import { configureStore } from '@reduxjs/toolkit';

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Combined reducer function wrapping up smaller reducers
  },
});

// RootState provides TypeScript with information about the shape of your redux state, which allows it to infer the type of state
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the dispatch function
export type AppDispatch = typeof store.dispatch;

// Export the store
export { store };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
