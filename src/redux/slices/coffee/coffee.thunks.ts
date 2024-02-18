import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchCoffeeShopThunk = createAsyncThunk(
  'coffeeShop/searchCoffeeShop',
  async (search: string) => {
    const response = await axios.get(
      `http://localhost:5193/coffee/search?search=${search}`,
    );
    console.log('response.data', response.data);
    return response.data;
  },
);
