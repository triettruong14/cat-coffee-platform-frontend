import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cat, CatFood, CoffeeShopApiResponse } from './coffeShopSlice';

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

export const getCoffeeShopCatFoodThunk = createAsyncThunk(
  'coffeeShop/getCatFood',
  async (shopId: string) => {
    const params = new URLSearchParams({ shopId });
    const response = await axios.get<CatFood[]>(
      'http://localhost:5193/api/ShopCoffeeCat/GetCatFood',
      { params },
    );
    return response.data;
  },
);

export const getCoffeeShopCatsThunk = createAsyncThunk(
  'coffeeShop/getCats',
  async (shopId: string) => {
    const response = await axios.get<Cat[]>(
      `http://localhost:5193/api/ShopCoffeeCat/GetCats, ${shopId}`,
    );
    return response.data;
  },
);

export const getCoffeeShopDrinksThunk = createAsyncThunk(
  'coffeeShop/getDrinks',
  async (shopId: string) => {
    const params = new URLSearchParams({ shopId });
    const response = await axios.get<CatFood[]>(
      'http://localhost:5193/api/ShopCoffeeCat/GetDrinks',
      { params },
    );
    return response.data;
  },
);
