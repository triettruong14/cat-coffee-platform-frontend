import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/authSlice';

export const rootReducers = combineReducers({
  authReducer: authReducer,
});
