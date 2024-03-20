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
import dayjs from 'dayjs';

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

export interface BookingRequest {
  bookingDate: string;
  total: number;
  accountId: string;
  shopId: string;
  tableId: string;
  drinks: { drinkId: number; quantity: number }[];
  catFoods: { foodCatId: number; quantity: number }[];
  drinksTotal: number;
  catFoodsTotal: number;
  slotId: string;
}

export const bookTableThunk = createAsyncThunk(
  'coffeeShop/bookTable',
  async ({
    total,
    accountId,
    shopId,
    drinks,
    catFoods,
    tableId,
    slotId,
    bookingDate,
    catFoodsTotal,
    drinksTotal,
  }: BookingRequest) => {
    let formattedDate = null;

    if (bookingDate) {
      formattedDate = dayjs(bookingDate).format('DD-MM-YYYY');
    }

    const response = await axios.post(
      `http://localhost:5193/api/Booking/CreateBooking`,
      {
        bookingDate: formattedDate,
        total,
        accountId,
        shopId: parseInt(shopId),
        tableId,
        listFoods: catFoods,
        listDrinks: drinks,
        slotId,
        catFoodsTotal,
        drinksTotal,
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
    const response = await axios.get<any>(
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

// DELETE

export const deleteCatById = createAsyncThunk(
  'coffeeShop/deleteCatById',
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5193/api/Cat/DeleteCat/${id}`,
    );
    return id;
  },
);

export const cancelBookingThunk = createAsyncThunk(
  'coffeeShop/cancelBooking',
  async (bookingId: number) => {
    const params = new URLSearchParams({ bookingId: bookingId.toString() });
    const response = await axios.delete(
      `http://localhost:5193/api/Booking/CancelBooking`,
      { params },
    );
    return response.data;
  },
);

// SHOP MANAGEMENT

export const updateShopProfile = createAsyncThunk(
  'coffeeShop/updateShopProfile',
  async (payload: { shop: CoffeeShopApiResponse; accountId: string }) => {
    const { shop, accountId } = payload;
    const response = await axios.put(
      `http://localhost:5193/api/ShopCoffeeCat/UpdateShop`,
      {
        ...shop,
        accountId,
      },
    );
    return response.data;
  },
);
