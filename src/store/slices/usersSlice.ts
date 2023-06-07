import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { removeUser } from '../thunks/removeUser';
import { addUser } from '../thunks/addUser';

export type UserType = {
  name: string;
  id: number;
};

type UsersState = {
  data: UserType[];
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
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
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
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<UserType>) => {
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

    builder.addCase(removeUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.isLoading = false;
      state.data = state.data.filter(user => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
