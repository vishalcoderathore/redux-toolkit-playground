import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import config from '../../../config';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async () => {
  await pause();
  const response = await axios.post(`${config.baseUrl}/users`, {
    name: faker.person.fullName(),
  });
  return response.data;
});

export { addUser };

// DEV ONLY
const pause = async (): Promise<void> => {
  // Simulating a delay of 7 seconds
  await new Promise(resolve => setTimeout(resolve, 100));
};
