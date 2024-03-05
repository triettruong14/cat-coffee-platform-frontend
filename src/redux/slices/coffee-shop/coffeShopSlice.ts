import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { CoffeeShop, CoffeeShopProps } from '../../../domain/models';
import {
  bookTableThunk,
  deleteCatById,
  getAllCoffeeShopsThunk,
  getBookingByAccountIdThunk,
  getCatTypeById,
  getCoffeeShopCatFoodThunk,
  getCoffeeShopCatsThunk,
  getCoffeeShopDrinksThunk,
  getShopIdByAccountEmailThunk,
  getSlotsThunk,
  getTableByShopIdThunk,
  searchCoffeeShopByNameThunk,
} from './coffeeShop.thunks';

export interface CoffeeShopApiResponse {
  shopId: string;
  accountId: string;
  shopName: string;
  startTime: string;
  endTime: string;
}

export interface CatFood {
  foodCatId: number;
  foodCatName: string;
  imageFoodForCat?: string;
  shopId?: number;
  foodPrice: number;
  status?: boolean;
  bookingDetails?: any[];
  shop?: any;
}

export interface Cat {
  catId: string;
  catTypeId: string;
  shopId: string;
  catName: string;
  imageCat: string;
}

export interface Slot {
  slotId: string;
  startTime: string;
  endTime: string;
}

export interface Table {
  tableId: string;
  shopId: string;
  areaId: string;
  tableName: string;
}

export interface Booking {
  bookingId?: number;
  shopName: string;
  bookingDate: string;
  total: number;
  accountId?: number;
  tableName: string;
  slotId: number;
  status?: boolean;
}

export interface Drink {
  drinkId: number;
  drinkName: string;
  shopId?: number;
  imageDrink?: string;
  price: number;
}

export interface CatType {
  catTypeId: number;
  catTypeName: string;
  status: boolean;
}

export interface CoffeeShopState {
  currentShopId?: number;
  coffeeShops?: CoffeeShop[];
  searchResults?: CoffeeShop[];
  catTypes: CatType[];
  isLoadingCatTypes: boolean;
  isLoadingSearch: boolean;
  isLoadingGetAll: boolean;
  isLoadingGetCats: boolean;
  isLoadingGetCatFood: boolean;
  isLoadingBooking: boolean;
  isLoadingBookingHistory: boolean;
  isLoadingGetDrinks: boolean;
  getDrinksSuccess?: boolean;
  selectedCoffeeShopCatFood?: CatFood[];
  selectedCoffeeShopCats?: Cat[];
  selectedCoffeeShopTables?: Table[];
  selectedCoffeeShopDrinks?: Drink[];
  bookingSuccess?: boolean;
  bookingHistory?: Booking[];
  slots: Slot[];
  deleteCatId?: string;
  error?: string;
}

const initialState: CoffeeShopState = {
  searchResults: [],
  coffeeShops: [],
  slots: [],
  catTypes: [],
  bookingHistory: [],
  selectedCoffeeShopCatFood: [],
  selectedCoffeeShopCats: [],
  selectedCoffeeShopTables: [],
  isLoadingGetCats: false,
  isLoadingGetCatFood: false,
  isLoadingGetDrinks: false,
  isLoadingSearch: false,
  isLoadingGetAll: false,
  isLoadingBooking: false,
  isLoadingBookingHistory: false,
  isLoadingCatTypes: false,
};

const coffeeShopSlice = createSlice({
  name: 'coffeeShop',
  initialState,
  reducers: {
    mockGetAllCoffeeShops: (state) => {},
    mockSearchCoffeeShopByName: (state, action) => {
      const { payload } = action;

      const mockCoffeeShops = [
        new CoffeeShop({
          shopId: '1',
          shopName: 'Shop 1',
          startDate: '8:00',
          endDate: '23:00',
        }),
        new CoffeeShop({
          shopId: '2',
          shopName: 'Shop 2',
          startDate: '8:00',
          endDate: '23:00',
        }),
      ];
      state.coffeeShops = mockCoffeeShops;
      state.searchResults = mockCoffeeShops.filter((shop) =>
        shop?.shopName?.toLowerCase().includes(payload.toLowerCase()),
      );
      state.isLoadingSearch = false;
    },
    mockGetTables: (state) => {
      // const mockTables = [
      //   {
      //     tableId: '1',
      //     tableName: 'Table 1',
      //     status: true,
      //   },
      //   {
      //     tableId: '2',
      //     tableName: 'Table 2',
      //     status: true,
      //   },
      // ];
      // state.selectedCoffeeShopTables = mockTables;
    },
    mockGetSlots: (state) => {
      const mockSlots = [
        {
          slotId: '1',
          startTime: '8:00',
          endTime: '9:00',
        },
        {
          slotId: '2',
          startTime: '9:00',
          endTime: '10:00',
        },
      ];
      state.slots = mockSlots;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchCoffeeShopByNameThunk.pending, (state) => {
        state.searchResults = [];
        state.isLoadingSearch = true;
      })
      .addCase(searchCoffeeShopByNameThunk.fulfilled, (state, action) => {
        const { payload } = action;

        const coffeeShops: CoffeeShop[] = [];
        payload.forEach((shop: CoffeeShopApiResponse) => {
          const { shopId, accountId, shopName, startTime, endTime } = shop;

          const coffeeShop = new CoffeeShop({
            shopId,
            accountId,
            shopName,
            startDate: startTime,
            endDate: endTime,
          });
          coffeeShops.push(coffeeShop);
        });
        state.searchResults = [...coffeeShops];
        state.isLoadingSearch = false;
      })
      .addCase(searchCoffeeShopByNameThunk.rejected, (state, action) => {
        const { error } = action;
        state.searchResults = [];
        toast.error(error.message);
        state.isLoadingSearch = false;
      });

    builder
      .addCase(getAllCoffeeShopsThunk.pending, (state, action) => {
        state.coffeeShops = [];
        state.isLoadingGetAll = true;
      })
      .addCase(getAllCoffeeShopsThunk.fulfilled, (state, action) => {
        const { payload } = action;

        const coffeeShops: CoffeeShop[] = [];
        payload.forEach((shop: CoffeeShopApiResponse) => {
          const { shopId, accountId, shopName, startTime, endTime } = shop;

          const coffeeShop = new CoffeeShop({
            shopId,
            accountId,
            shopName,
            startDate: startTime,
            endDate: endTime,
          });
          coffeeShops.push(coffeeShop);
        });
        state.coffeeShops = coffeeShops;
        state.isLoadingGetAll = false;
      })
      .addCase(getAllCoffeeShopsThunk.rejected, (state, action) => {
        const { error } = action;
        state.coffeeShops = [];
        toast.error(error.message);
        state.isLoadingGetAll = false;
      });

    builder
      .addCase(getCoffeeShopCatFoodThunk.pending, (state, action) => {
        state.selectedCoffeeShopCatFood = [];
        state.isLoadingGetCatFood = true;
      })
      .addCase(getCoffeeShopCatFoodThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const catFoods: CatFood[] = payload;

        state.selectedCoffeeShopCatFood = catFoods;
        state.isLoadingGetCatFood = false;
      })
      .addCase(getCoffeeShopCatFoodThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
        state.isLoadingGetCatFood = false;
      });

    builder
      .addCase(getCoffeeShopCatsThunk.pending, (state, action) => {
        state.selectedCoffeeShopCatFood = [];
        state.isLoadingGetCats = true;
      })
      .addCase(getCoffeeShopCatsThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const cats: Cat[] = payload;
        state.selectedCoffeeShopCats = cats;
        state.isLoadingGetCats = false;
      })
      .addCase(getCoffeeShopCatsThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
        state.isLoadingGetCats = false;
      });

    builder
      .addCase(getCoffeeShopDrinksThunk.pending, (state, action) => {
        state.selectedCoffeeShopDrinks = [];
        state.getDrinksSuccess = false;
        state.isLoadingGetDrinks = true;
      })
      .addCase(getCoffeeShopDrinksThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const drinks: Drink[] = payload;
        state.selectedCoffeeShopDrinks = drinks;
        state.getDrinksSuccess = true;
        state.isLoadingGetDrinks = false;
      })
      .addCase(getCoffeeShopDrinksThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
        state.getDrinksSuccess = false;
        state.isLoadingGetDrinks = false;
      });

    builder
      .addCase(getSlotsThunk.pending, (state, action) => {
        state.slots = [];
      })
      .addCase(getSlotsThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.slots = payload;
      })
      .addCase(getSlotsThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
      });

    builder
      .addCase(getTableByShopIdThunk.pending, (state, action) => {
        state.selectedCoffeeShopTables = [];
      })
      .addCase(getTableByShopIdThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.selectedCoffeeShopTables = payload;
      })
      .addCase(getTableByShopIdThunk.rejected, function (state, action): void {
        const { error } = action;
        toast.error(error.message);
      });

    builder
      .addCase(bookTableThunk.pending, (state) => {
        state.isLoadingBooking = true;
        state.bookingSuccess = false;
      })
      .addCase(bookTableThunk.fulfilled, (state) => {
        state.isLoadingBooking = false;
        state.bookingSuccess = false;
        toast.success('Booking successful');
      })
      .addCase(bookTableThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
        state.isLoadingBooking = false;
        state.bookingSuccess = false;
      });

    builder
      .addCase(getBookingByAccountIdThunk.pending, (state) => {
        state.bookingHistory = [];
        state.isLoadingBookingHistory = true;
      })
      .addCase(getBookingByAccountIdThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.bookingHistory = payload;
        state.isLoadingBookingHistory = false;
      })
      .addCase(getBookingByAccountIdThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
        state.isLoadingBookingHistory = false;
      });

    builder
      .addCase(getShopIdByAccountEmailThunk.pending, (state) => {
        state.currentShopId = undefined;
      })
      .addCase(getShopIdByAccountEmailThunk.fulfilled, (state, action) => {
        const { payload } = action;
        state.currentShopId = payload.shopId as any;
      })
      .addCase(getShopIdByAccountEmailThunk.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
      });

    builder
      .addCase(getCatTypeById.pending, (state) => {
        state.catTypes = [];
        state.isLoadingCatTypes = true;
      })
      .addCase(getCatTypeById.fulfilled, (state, action) => {
        const { payload } = action;
        state.catTypes.push(payload);
        state.isLoadingCatTypes = false;
      })
      .addCase(getCatTypeById.rejected, (state, action) => {
        const { error } = action;
        state.isLoadingCatTypes = false;
        toast.error(error.message);
      });

    // <--------- DELETE --------->

    builder
      .addCase(deleteCatById.pending, (state, action) => {
        const { payload } = action;
        state.deleteCatId = payload;
      })
      .addCase(deleteCatById.fulfilled, (state) => {
        const cats = state.selectedCoffeeShopCats;
        const newCats = cats?.filter((cat) => cat.catId !== state.deleteCatId);
        state.selectedCoffeeShopCats = newCats;

        toast.success('Delete cat successful');
      })
      .addCase(deleteCatById.rejected, (state, action) => {
        const { error } = action;
        toast.error(error.message);
      });
  },
});

export const coffeeShopReducer = coffeeShopSlice.reducer;
export const {
  mockGetAllCoffeeShops,
  mockSearchCoffeeShopByName,
  mockGetSlots,
  mockGetTables,
} = coffeeShopSlice.actions;
