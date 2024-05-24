import { describe, expect, test } from '@jest/globals';
import {
  getBurgerOrtder,
  newOrderReduce,
  initialState,
  resetOrder
} from './newOrder';

describe('тестs newOrder', () => {
  const testOrder = {
    success: true,
    name: 'Пицца с ананасом',
    order: {
      _id: '54321',
      ingredients: ['1', '2', '1'],
      owner: 'johnDou',
      status: 'done',
      createdAt: '2024-05-21000:00:00.0000',
      updatedAt: '2024-05-21000:00:00.0000',
      number: 55555,
      __v: 0,
      name: 'Пицца с ананасом'
    }
  };

  test('Проверка fulfilled', () => {
    const fFstate = newOrderReduce(
      initialState,
      getBurgerOrtder.fulfilled(testOrder, '', [''])
    );
    expect(fFstate.orderRequest).toEqual(false);
    expect(fFstate.orderModalData).toEqual(testOrder.order);
  });
  test('проверка сброса', () => {
    const InitResState = {
      orderRequest: true,
      orderModalData: testOrder.order,
      error: 'undefined'
    };
    const constResOrder = newOrderReduce(InitResState, resetOrder());
    expect(constResOrder).toEqual(initialState);
  });

  test('проверка rejected', () => {
    const rejectState = newOrderReduce(
      initialState,
      getBurgerOrtder.rejected(new Error('error'), 'тестовая ошибка', [''])
    );
    expect(rejectState.error).toEqual('error');
  });

  test('проверка pending', () => {
    const pendingState = newOrderReduce(
      initialState,
      getBurgerOrtder.pending('', [])
    );
    expect(pendingState.orderRequest).toEqual(true);
  });
});
