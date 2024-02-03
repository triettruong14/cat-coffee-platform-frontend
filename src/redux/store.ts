import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './root.reducer';

export const store = configureStore({
  reducer: rootReducers,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
