import { describe, expect, test } from '@jest/globals';
import { getUserOrders, ordersReduce, initialState } from './orders';

describe('тестs orders', () => {
  const ordersMock = [
    {
      _id: '54321',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Пицца с ананасом',
      createdAt: '2024-05-21000:00:00.0000',
      updatedAt: '2024-05-21000:00:00.0000',
      number: 55555
    },
    {
      _id: '12345',
      ingredients: ['3', '4'],
      status: 'done',
      name: 'Огуречный рассол',
      createdAt: '2024-05-22000:00:00.0000',
      updatedAt: '2024-05-22000:00:00.0000',
      number: 11111
    }
  ];

  test('Проверка fulfilled', () => {
    const fFstateTarget = {
      ...initialState,
      isLoading: false,
      orders: ordersMock
    };
    const fFstate = ordersReduce(
      initialState,
      getUserOrders.fulfilled(ordersMock, '')
    );
    expect(fFstate).toEqual(fFstateTarget);
  });

  test('Проверка rejected', () => {
    const rejectedState = ordersReduce(
      initialState,
      getUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(rejectedState.isLoading).toEqual(false);
  });

  test('Проверка pending', () => {
    const pendState = ordersReduce(
      initialState,
      getUserOrders.pending('тестовая ошибка')
    );
    expect(pendState.isLoading).toEqual(true);
  });
});
