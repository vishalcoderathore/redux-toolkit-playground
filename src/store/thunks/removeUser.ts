import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../slices/usersSlice';
import config from '../../../config';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user: UserType) => {
  await axios.delete(`${config.baseUrl}/users/${user.id}`);
  return user;
});

export { removeUser };
