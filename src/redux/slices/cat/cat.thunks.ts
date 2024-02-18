import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CatTypesResponse {
  catTypeId: string;
  catTypeName: string;
  status: boolean;
}

export const getCatTypesThunk = createAsyncThunk(
  'cats/getCatTypes',
  async () => {
    const response = await axios.get<CatTypesResponse[]>(
      'http://localhost:5193/api/CatType',
    );
    const data = response.data;
    return data;
  },
);
