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

export const selectSlots = (state: RootState) => state.coffeeShop.slots;

export const selectSelectedCoffeeShopTables = (state: RootState) =>
  state.coffeeShop.selectedCoffeeShopTables;

export const selectSelectedCoffeeShopDrinks = (state: RootState) =>
  state.coffeeShop.selectedCoffeeShopDrinks;

export const selectGetDrinkStatus = (state: RootState) =>
  state.coffeeShop.getDrinksSuccess;

export const selectLoadingGetDrinks = (state: RootState) =>
  state.coffeeShop.isLoadingGetDrinks;

export const selectIsLoadingBooking = (state: RootState) =>
  state.coffeeShop.isLoadingBooking;

export const selectBookingSuccess = (state: RootState) =>
  state.coffeeShop.bookingSuccess;

export const selectBookingHistory = (state: RootState) =>
  state.coffeeShop.bookingHistory;

export const selectIsLoadingBookingHistory = (state: RootState) =>
  state.coffeeShop.isLoadingBookingHistory;

export const selectCurrentShopId = (state: RootState) =>
  state.coffeeShop.currentShopId;
