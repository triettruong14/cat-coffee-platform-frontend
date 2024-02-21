import { RootState } from '../../store';

export const selectSearchResults = (state: RootState) =>
  state.coffeeShop.searchResults;

export const selectIsLoadingSearch = (state: RootState) =>
  state.coffeeShop.isLoadingSearch;

export const selectCoffeeShops = (state: RootState) =>
  state.coffeeShop.coffeeShops;

export const selectIsLoadingGetAll = (state: RootState) =>
  state.coffeeShop.isLoadingGetAll;

export const selectSelectedCoffeeShopCatFood = (state: RootState) =>
  state.coffeeShop.selectedCoffeeShopCatFood;

export const selectSelectedCoffeeShopCats = (state: RootState) =>
  state.coffeeShop.selectedCoffeeShopCats;

export const selectLoadingGetCats = (state: RootState) =>
  state.coffeeShop.isLoadingGetCats;

export const selectLoadingGetCatFood = (state: RootState) =>
  state.coffeeShop.isLoadingGetCatFood;
