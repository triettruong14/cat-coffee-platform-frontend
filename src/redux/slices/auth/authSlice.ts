import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerThunk, signInThunk } from './auth.thunks';

const initialState = {
  isLoading: false,
  signInSuccess: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.user = payload;
        state.signInSuccess = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { payload } = action;
        console.log('payload', payload);
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        const { error } = action;
        state.isLoading = false;
        toast.error(error.message);
      });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;
