import { createSlice } from '@reduxjs/toolkit';
import { searchCoffeeShopByNameThunk } from './coffeeShop.thunks';

export interface CoffeeShopState {
  searchResults?: any[];
  error?: string;
}

const initialState: CoffeeShopState = {
  searchResults: [],
};

const coffeeShopSlice = createSlice({
  name: 'coffeeShop',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchCoffeeShopByNameThunk.pending, (state, action) => {
        state.searchResults = [];
      })
      .addCase(searchCoffeeShopByNameThunk.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchCoffeeShopByNameThunk.rejected, (state, action) => {
        const { error } = action;
        state.searchResults = [];
        state.error = error.message;
      });
  },
});

export const coffeeShopReducer = coffeeShopSlice.reducer;
export const {} = coffeeShopSlice.actions;
