import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { CoffeeShop, CoffeeShopProps } from '../../../domain/models';
import {
  getAllCoffeeShopsThunk,
  getCoffeeShopCatFoodThunk,
  getCoffeeShopCatsThunk,
  searchCoffeeShopByNameThunk,
} from './coffeeShop.thunks';

export interface CoffeeShopApiResponse {
  shopId: string;
  accountId: string;
  shopName: string;
  startTime: string;
  endTime: string;
}

export interface CatFood {
  catFoodId: number;
  catFoodName: string;
  catFoodPrice: number;
}

export interface Cat {
  catId: string;
  catTypeId: string;
  areaId: string;
  shopId: string;
  catName: string;
}

export interface Drink {}

export interface CoffeeShopState {
  coffeeShops?: CoffeeShop[];
  searchResults?: CoffeeShop[];
  isLoadingSearch: boolean;
  isLoadingGetAll: boolean;
  isLoadingGetCats: boolean;
  isLoadingGetCatFood: boolean;
  selectedCoffeeShopCatFood?: CatFood[];
  selectedCoffeeShopCats?: Cat[];
  error?: string;
}

const initialState: CoffeeShopState = {
  searchResults: [],
  coffeeShops: [],
  selectedCoffeeShopCatFood: [],
  selectedCoffeeShopCats: [],
  isLoadingGetCats: false,
  isLoadingGetCatFood: false,
  isLoadingSearch: false,
  isLoadingGetAll: false,
};

const coffeeShopSlice = createSlice({
  name: 'coffeeShop',
  initialState,
  reducers: {
    mockGetAllCoffeeShops: (state) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(searchCoffeeShopByNameThunk.pending, (state) => {
        state.searchResults = [];
        state.isLoadingSearch = true;
      })
      .addCase(searchCoffeeShopByNameThunk.fulfilled, (state, action) => {
        const { payload } = action;

        const coffeeShops: CoffeeShop[] = [];
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
          coffeeShops.push(coffeeShop);
        });
        state.searchResults = [...coffeeShops];
        state.isLoadingSearch = false;
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

        const coffeeShops: CoffeeShop[] = [];
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
          coffeeShops.push(coffeeShop);
        });
        state.coffeeShops = coffeeShops;
        state.isLoadingGetAll = false;
      })
      .addCase(getAllCoffeeShopsThunk.rejected, (state, action) => {
        const { error } = action;
        state.coffeeShops = [];
        state.error = error.message;
        state.isLoadingGetAll = false;
      });

    builder
      .addCase(getCoffeeShopCatFoodThunk.pending, (state, action) => {
        state.selectedCoffeeShopCatFood = [];
        state.isLoadingGetCatFood = true;
      })
      .addCase(getCoffeeShopCatFoodThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const catFoods: CatFood[] = payload;

        state.selectedCoffeeShopCatFood = catFoods;
        state.isLoadingGetCatFood = false;
      })
      .addCase(getCoffeeShopCatFoodThunk.rejected, (state, action) => {
        const { error } = action;
        state.error = error.message;
        state.isLoadingGetCatFood = false;
      });

    builder
      .addCase(getCoffeeShopCatsThunk.pending, (state, action) => {
        state.selectedCoffeeShopCatFood = [];
        state.isLoadingGetCats = true;
      })
      .addCase(getCoffeeShopCatsThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const cats: Cat[] = payload;
        state.selectedCoffeeShopCats = cats;
        state.isLoadingGetCats = false;
      })
      .addCase(getCoffeeShopCatsThunk.rejected, (state, action) => {
        const { error } = action;
        state.error = error.message;
        state.isLoadingGetCats = false;
      });
  },
});

export const coffeeShopReducer = coffeeShopSlice.reducer;
export const { mockGetAllCoffeeShops } = coffeeShopSlice.actions;
