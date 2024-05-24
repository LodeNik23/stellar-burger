import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

import { orderBurgerApi } from '@api';

export const getBurgerOrtder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerOrtder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getBurgerOrtder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getBurgerOrtder.pending, (state) => {
        state.orderRequest = true;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;

export const newOrderReduce = newOrderSlice.reducer;
