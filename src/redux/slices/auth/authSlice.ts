import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Account } from '../../../domain/models';
import { registerThunk, signInThunk } from './auth.thunks';

interface AuthState {
  isLoading: boolean;
  signInSuccess: boolean;
  account: Account | null;
}

const initialState: AuthState = {
  isLoading: false,
  signInSuccess: false,
  account: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.account = null;
      state.signInSuccess = false;
    },
    mockSignIn: (state, action) => {
      state.account = action.payload;
      state.signInSuccess = true;
    },
    mockRegister: (state, action) => {
      state.account = action.payload;
      state.signInSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.isLoading = false;

        const account = new Account({
          ...payload,
          id: payload.accountId,
          username: payload.userName,
        });

        state.account = account;
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

        state.signInSuccess = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        const { error } = action;
        state.isLoading = false;
        toast.error(error.message);
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, mockSignIn, mockRegister } = authSlice.actions;
