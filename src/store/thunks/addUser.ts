import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async () => {
  const response = await axios.post('http://localhost:3001/users', {
    name: faker.person.fullName(),
  });
  return response.data;
});

export { addUser };
