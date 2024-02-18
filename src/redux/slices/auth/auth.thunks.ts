import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

interface RegisterPayload {
  roleId: string;
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `http://localhost:5193/api/Account/login?email=${email}&password=${password}`,
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
  async ({
    username,
    phone,
    address,
    dateOfBirth,
    email,
    password,
  }: RegisterPayload) => {
    const formattedDateOfBirth = null;

    if (dateOfBirth) {
      const formattedDateOfBirth = dayjs(dateOfBirth).format('DD/MM/YYYY');
    }

    const response = await axios.post(
      `http://localhost:5193/api/Account/create${username !== undefined && username !== null ? `,${username}` : ''}${email !== undefined && email !== null ? `,${email}` : ''}${password !== undefined && password !== null ? `,${password}` : ''}${phone !== undefined && phone !== null ? `,${phone}` : ''}${address !== undefined && address !== null ? `,${address}` : ''}${formattedDateOfBirth !== undefined && formattedDateOfBirth !== null ? `,${formattedDateOfBirth}` : ''}`,
    );
    console.log('response.data', response.data);
    return response.data;
  },
);
