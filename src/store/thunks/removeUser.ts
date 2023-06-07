import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../slices/usersSlice';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user: UserType) => {
  await axios.delete(`http://localhost:3001/users/${user.id}`);
  return user;
});

export { removeUser };
