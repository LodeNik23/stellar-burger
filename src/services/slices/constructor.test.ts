import { describe, expect, test } from '@jest/globals';
import { rootReducer } from '../rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  burgerReduce,
  initialState,
  addIngredient,
  handleMoveIngredient,
  removeIngredient
} from './constructor';

describe('тест Конструктора', () => {
  const testIngredients = [
    {
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
    },
    {
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
    }
  ];
  const addingIngredient = {
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

  const burgerState = { ...initialState, addIngredient: testIngredients };

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

  test('удаление ингредиента', () => {});
  test('перемещение ингредиента', () => {});
});
