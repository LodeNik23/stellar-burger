import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export interface TConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
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
