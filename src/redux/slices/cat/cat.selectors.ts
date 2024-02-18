import { RootState } from '../../store';

export const selectCatTypes = (state: RootState) => state.catReducer.catTypes;

export const selectIsLoadingGetCatTypes = (state: RootState) =>
  state.catReducer.isLoadingGetCatTypes;
