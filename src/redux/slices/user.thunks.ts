import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      'http://localhost:5193/api/Account/login',
      { email, password },
    );
    console.log('response.data', response.data);
    return response.data;
  },
);
