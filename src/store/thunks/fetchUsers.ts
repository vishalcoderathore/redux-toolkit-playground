import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../../config';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  await pause();
  const response = await axios.get(`${config.baseUrl}/users`);
  return response.data;
});

export { fetchUsers };

// DEV ONLY
const pause = async (): Promise<void> => {
  // Simulating a delay of 7 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));
};
