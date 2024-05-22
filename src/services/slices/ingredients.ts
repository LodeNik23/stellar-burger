import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const getAllIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export interface TIngredientState {
  loading: boolean;
  ingredients: Array<TIngredient>;
  error: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const IngredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getLoadingIngredients: (state) => state.loading,
    getIngredients: (state) => state.ingredients,

    getIngredientsBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getIngredientsMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getIngredientsSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        state.loading = false;
        state.ingredients = [];
      })
      .addCase(getAllIngredients.pending, (state) => {
        state.loading = true;
      });
  }
});

export const {
  getLoadingIngredients,
  getIngredients,
  getIngredientsBuns,
  getIngredientsMains,
  getIngredientsSauces
} = IngredientSlice.selectors;

export const ingredientsReduce = IngredientSlice.reducer;
