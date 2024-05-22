import { describe, expect, test } from '@jest/globals';
import {
  ingredientsReduce,
  initialState,
  getAllIngredients
} from './ingredients';

describe('тестs ingredients', () => {
  const testIngredient = [
    {
      id: '1',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  test('Проверка fulfilled', () => {
    const fFIngState = ingredientsReduce(
      initialState,
      getAllIngredients.fulfilled(testIngredient, '')
    );
    expect(fFIngState.ingredients).toEqual(testIngredient);
    expect(fFIngState.loading).toEqual(false);
  });
  test('проверка rejected', () => {
    const doIt = {
      type: getAllIngredients.rejected.type
    };
    const rejectIngState = ingredientsReduce(initialState, doIt);
    expect(rejectIngState.loading).toEqual(false);
    expect(rejectIngState.ingredients).toEqual([]);
  });
  test('проверка pending', () => {
    const pendingState = ingredientsReduce(
      initialState,
      getAllIngredients.pending('')
    );
    expect(pendingState.loading).toEqual(true);
  });
});
