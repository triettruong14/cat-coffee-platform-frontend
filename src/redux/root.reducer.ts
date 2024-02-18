import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, catReducer } from './slices/';

export const rootReducers = combineReducers({
  auth: authReducer,
  catReducer: catReducer,
});
