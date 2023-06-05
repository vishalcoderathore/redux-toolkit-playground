import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';

export type User = {
  name: string;
  id: number;
};

type UsersState = {
  data: User[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: UsersState = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (typeof action.payload.id === 'number' && typeof action.payload.name === 'string') {
        state.isLoading = false;
        state.data.push(action.payload);
      } else {
        throw new Error('Payload does not match User type');
      }
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
