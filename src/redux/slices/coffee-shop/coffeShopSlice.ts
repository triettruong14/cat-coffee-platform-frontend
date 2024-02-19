import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { CoffeeShop, CoffeeShopProps } from '../../../domain/models';
import {
  getAllCoffeeShopsThunk,
  searchCoffeeShopByNameThunk,
} from './coffeeShop.thunks';

export interface CoffeeShopApiResponse {
  shopId: number;
  accountId: number;
  shopName: string;
  startTime: string;
  endTime: string;
}

export interface CoffeeShopState {
  coffeeShops?: CoffeeShop[];
  searchResults?: CoffeeShop[];
  isLoadingSearch: boolean;
  isLoadingGetAll: boolean;
  error?: string;
}

const initialState: CoffeeShopState = {
  searchResults: [],
  coffeeShops: [],
  isLoadingSearch: false,
  isLoadingGetAll: false,
};

const coffeeShopSlice = createSlice({
  name: 'coffeeShop',
  initialState,
  reducers: {
    mockGetAllCoffeeShops: (state) => {
      state.isLoadingGetAll = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchCoffeeShopByNameThunk.pending, (state, action) => {
        state.searchResults = [];
        state.isLoadingSearch = true;
      })
      .addCase(searchCoffeeShopByNameThunk.fulfilled, (state, action) => {
        const { payload } = action;

        payload.forEach((shop: CoffeeShopApiResponse) => {
          const { shopId, accountId, shopName, startTime, endTime } = shop;
          const formattedStartDate = dayjs(startTime).format('DD/MM/YYYY');
          const formattedEndDate = dayjs(endTime).format('DD/MM/YYYY');
          const coffeeShop = new CoffeeShop({
            shopId,
            accountId,
            shopName,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          });
          state.searchResults?.push(coffeeShop);
          state.isLoadingSearch = false;
        });
      })
      .addCase(searchCoffeeShopByNameThunk.rejected, (state, action) => {
        const { error } = action;
        state.searchResults = [];
        state.error = error.message;
        state.isLoadingSearch = false;
      });

    builder
      .addCase(getAllCoffeeShopsThunk.pending, (state, action) => {
        state.coffeeShops = [];
        state.isLoadingGetAll = true;
      })
      .addCase(getAllCoffeeShopsThunk.fulfilled, (state, action) => {
        const { payload } = action;

        payload.forEach((shop: CoffeeShopApiResponse) => {
          const { shopId, accountId, shopName, startTime, endTime } = shop;
          const formattedStartDate = dayjs(startTime).format('DD/MM/YYYY');
          const formattedEndDate = dayjs(endTime).format('DD/MM/YYYY');
          const coffeeShop = new CoffeeShop({
            shopId,
            accountId,
            shopName,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          });
          state.coffeeShops?.push(coffeeShop);
        });
        state.isLoadingGetAll = false;
      })
      .addCase(getAllCoffeeShopsThunk.rejected, (state, action) => {
        const { error } = action;
        state.coffeeShops = [];
        state.error = error.message;
        state.isLoadingGetAll = false;
      });
  },
});

export const coffeeShopReducer = coffeeShopSlice.reducer;
export const { mockGetAllCoffeeShops } = coffeeShopSlice.actions;
