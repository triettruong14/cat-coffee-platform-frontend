import { createSlice } from '@reduxjs/toolkit';
import { CatTypesResponse, getCatTypesThunk } from './cat.thunks';

interface CatState {
  cats: string[];
  error?: string;
  catTypes: CatTypesResponse[];
  isLoadingGetCatTypes?: boolean;
}

const initialState: CatState = {
  cats: [],
  error: '',
  catTypes: [],
  isLoadingGetCatTypes: false,
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCatTypesThunk.pending, (state) => {
        state.catTypes = [];
        state.isLoadingGetCatTypes = true;
      })
      .addCase(getCatTypesThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.catTypes = payload;
        state.isLoadingGetCatTypes = false;
      })
      .addCase(getCatTypesThunk.rejected, (state, action) => {
        const { error } = action;
        state.catTypes = [];
        state.error = error.message;
        state.isLoadingGetCatTypes = false;
      });
  },
});

export const catReducer = catSlice.reducer;
export const {} = catSlice.actions;
