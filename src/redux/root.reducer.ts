import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/userSlice';

export const rootReducers = combineReducers({
  authReducer: authReducer,
});
