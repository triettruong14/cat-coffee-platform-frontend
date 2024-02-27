import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Booking,
  Cat,
  CatFood,
  CatType,
  CoffeeShopApiResponse,
  Drink,
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
    const params = new URLSearchParams({ id: shopId });
    const response = await axios.get<CatFood[]>(
      'http://localhost:5193/api/FoodForCat/GetByShopId',
      { params },
    );
    return response.data;
  },
);

export const getCoffeeShopCatsThunk = createAsyncThunk(
  'coffeeShop/getCats',
  async (shopId: string) => {
    console.log('shopId', shopId);
    const params = new URLSearchParams({ shopId });
    const response = await axios.get<Cat[]>(
      `http://localhost:5193/api/Cat/getCatByShop`,
      {
        params,
      },
    );
    return response.data;
  },
);

export const getCoffeeShopDrinksThunk = createAsyncThunk(
  'coffeeShop/getDrinks',
  async (shopId: string) => {
    const params = new URLSearchParams({ shopId });
    const response = await axios.get<Drink[]>(
      'http://localhost:5193/api/Drink/getByShopId',
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
  bookingDate: string;
  total: number;
  accountId: string;
  shopId: string;
  tableId: string;
  slotId: string;
}

export const bookTableThunk = createAsyncThunk(
  'coffeeShop/bookTable',
  async ({
    total,
    accountId,
    shopId,
    tableId,
    slotId,
    bookingDate,
  }: BookingRequest) => {
    const response = await axios.post(
      `http://localhost:5193/api/Booking/CreateBooking`,
      {
        bookingDate: bookingDate,
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

export const getBookingByAccountIdThunk = createAsyncThunk(
  'coffeeShop/getBookingByAccountId',
  async (accountId: string) => {
    const response = await axios.get<Booking[]>(
      `http://localhost:5193/api/Booking/GetBoking,${accountId.toString()}`,
    );
    return response.data;
  },
);

export const getShopIdByAccountEmailThunk = createAsyncThunk(
  'coffeeShop/getShopIdByAccountEmail',
  async (email: string) => {
    const params = new URLSearchParams({ email });
    const response = await axios.get<number>(
      `http://localhost:5193/api/ShopCoffeeCat/getShopByEmail`,
      {
        params,
      },
    );
    return response.data;
  },
);

export const getCatTypeById = createAsyncThunk(
  'coffeeShop/getCatTypeById',
  async (id: string) => {
    const response = await axios.get<CatType>(
      `http://localhost:5193/api/CatType/${id}`,
    );
    return response.data;
  },
);
