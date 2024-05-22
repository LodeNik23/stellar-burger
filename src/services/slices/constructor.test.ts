import { describe, expect, test } from '@jest/globals';
import {
  burgerReduce,
  initialState,
  addIngredient,
  handleMoveIngredient,
  removeIngredient,
  resetConstructor,
  getConstructor
} from './constructor';
import { getIngredients } from './ingredients';

describe('тест Конструктора', () => {
  const testIngredient = {
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
  };

  const testIBun = {
    id: '3',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const addingIngredient = {
    id: '2',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
  };

  // const burgerState = { ...initialState, addIngredient: testIngredients };

  test('добавление ингредиента', () => {
    const addState = burgerReduce(
      initialState,
      addIngredient(addingIngredient)
    );
    expect(addState.ingredients).toHaveLength(1);
    const noId = (obj: Record<string, any>) => {
      const { id, ...rest } = obj;
      return rest;
    };
    expect(noId(addState.ingredients[0])).toEqual(noId(addingIngredient));
  });

  test('удаление ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [testIngredient]
    };
    const newState = burgerReduce(initialState, removeIngredient('1'));
    expect(newState.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента', () => {
    const moveState = {
      bun: null,
      ingredients: [testIngredient, addingIngredient]
    };
    const movedState = burgerReduce(
      moveState,
      handleMoveIngredient({ index: 1, step: -1 })
    );
    expect(movedState.ingredients[0]).toEqual(addingIngredient);
  });

  test('сброс конструктора', () => {
    const resetConstructorState = {
      bun: testIBun,
      ingredients: [testIngredient]
    };

    const resetedState = burgerReduce(
      resetConstructorState,
      resetConstructor()
    );
    expect(resetedState.ingredients).toHaveLength(0);
    expect(resetedState.bun).toEqual(null);
  });
  test('cелектор getConstructor возвращает состояние', () => {
    const state = {
      constructor: {
        bun: testIBun,
        ingredients: [testIngredient]
      }
    };
    const backState = getConstructor(state);
    expect(backState).toEqual(state.constructor);
  });
});
