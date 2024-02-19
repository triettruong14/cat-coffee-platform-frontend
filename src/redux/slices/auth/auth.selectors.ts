import { RootState } from '../../store';

export const selectSignInStatus = (state: RootState) =>
  state.auth.signInSuccess;

export const selectUser = (state: RootState) => state.auth.account;
