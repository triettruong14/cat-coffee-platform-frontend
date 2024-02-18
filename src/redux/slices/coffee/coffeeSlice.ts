import { createSlice } from '@reduxjs/toolkit';
import { searchCoffeeShopThunk } from './coffee.thunks';

interface CoffeeShopState {
  searchResults?: any[];
  error?: string;
}

const initialState: CoffeeShopState = {
  searchResults: [],
};

export const coffeeShopSlice = createSlice({
  name: 'coffeeShop',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchCoffeeShopThunk.pending, (state, action) => {
        state.searchResults = [];
      })
      .addCase(searchCoffeeShopThunk.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchCoffeeShopThunk.rejected, (state, action) => {
        const { error } = action;
        state.searchResults = [];
        state.error = error.message;
      });
  },
});
