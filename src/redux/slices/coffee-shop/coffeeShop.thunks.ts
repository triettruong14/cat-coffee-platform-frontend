import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CoffeeShopApiResponse } from './coffeShopSlice';

export const searchCoffeeShopByNameThunk = createAsyncThunk(
  'coffeeShop/searchShopByName',
  async (search: string) => {
    const response = await axios.get<CoffeeShopApiResponse[]>(
      `http://localhost:5193/api/ShopCoffeeCat/${search}`,
    );
    console.log('response.data', response.data);
    return response.data;
  },
);

export const getAllCoffeeShopsThunk = createAsyncThunk(
  'coffeeShop/getAllShops',
  async () => {
    const response = await axios.get<CoffeeShopApiResponse[]>(
      'http://localhost:5193/api/ShopCoffeeCat/GetAll',
    );
    return response.data;
  },
);
