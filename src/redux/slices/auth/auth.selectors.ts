import { RootState } from '../../store';

export const selectSignInStatus = (state: RootState) =>
  state.auth.signInSuccess;
