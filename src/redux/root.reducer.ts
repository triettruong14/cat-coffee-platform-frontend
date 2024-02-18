import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, catReducer, coffeeShopReducer } from './slices/';

export const rootReducers = combineReducers({
  auth: authReducer,
  catReducer: catReducer,
  coffeeShop: coffeeShopReducer,
});
