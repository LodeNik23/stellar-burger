import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';

export interface TConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    handleMoveIngredient: (state, action) => {
      const { index, step } = action.payload;
      [state.ingredients[index], state.ingredients[index + step]] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    resetConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const {
  addIngredient,
  handleMoveIngredient,
  removeIngredient,
  resetConstructor
} = ConstructorSlice.actions;
export const { getConstructor } = ConstructorSlice.selectors;
export const burgerReduce = ConstructorSlice.reducer;
