import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  await pause();
  const response = await axios.get('http://localhost:3001/users');
  return response.data;
});

export { fetchUsers };

// DEV ONLY
const pause = async (): Promise<void> => {
  // Simulating a delay of 7 seconds
  await new Promise(resolve => setTimeout(resolve, 1000));
};
