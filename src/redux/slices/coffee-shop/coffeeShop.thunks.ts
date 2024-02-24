import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Cat,
  CatFood,
  CoffeeShopApiResponse,
  Slot,
  Table,
} from './coffeShopSlice';
import moment from 'moment';

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
    console.log('shopId', shopId);
    const response = await axios.get<Cat[]>(
      `http://localhost:5193/api/Cat/getCat, ${shopId.toString()}`,
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

export const getSlotsThunk = createAsyncThunk(
  'coffeeShop/getSlots',
  async () => {
    const response = await axios.get<Slot[]>(
      `http://localhost:5193/api/SlotBooking`,
    );
    return response.data;
  },
);

export const getTableByShopIdThunk = createAsyncThunk(
  'coffeeShop/getTableByShopId',
  async (shopId: string) => {
    const response = await axios.get<Table[]>(
      `http://localhost:5193/api/Table/${shopId.toString()}`,
    );
    console.log('table response', response.data);
    return response.data;
  },
);

interface BookingRequest {
  total: number;
  accountId: string;
  shopId: string;
  tableId: string;
  slotId: string;
}

export const bookTableThunk = createAsyncThunk(
  'coffeeShop/bookTable',
  async ({ total, accountId, shopId, tableId, slotId }: BookingRequest) => {
    const response = await axios.post(
      `http://localhost:5193/api/Booking/CreateBooking`,
      {
        bookingDate: moment().format('DD/MM/YYYY'),
        total,
        accountId,
        shopId: parseInt(shopId),
        tableId,
        slotId,
      },
    );
    return response.data;
  },
);
