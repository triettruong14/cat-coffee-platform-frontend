import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:5193/api/Account/login',
        { email, password },
      );
      console.log('response.data', response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      'http://localhost:5193/api/Account/register',
      { email, password },
    );
    console.log('response.data', response.data);
    return response.data;
  },
);
