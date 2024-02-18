import { RootState } from '../../store';

export const selectSearchResults = (state: RootState) =>
  state.coffeeShop.searchResults;
