import { describe, expect, test } from '@jest/globals';
import { getAllFeeds, feedsReduce, initialState } from './feeds';

describe('тестs feeds', () => {
  const feedsMock = {
    success: true,
    orders: [
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
    ],
    total: 4,
    totalToday: 2
  };

  test('Проверка fulfilled', () => {
    const fFstateTarget = {
      ...initialState,
      isLoading: false,
      orders: feedsMock.orders,
      total: feedsMock.total,
      totalToday: feedsMock.totalToday
    };
    const doIt = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMock
    };
    const fFstate = feedsReduce(initialState, doIt);
    expect(fFstate).toEqual(fFstateTarget);
    expect(fFstate.isLoading).toEqual(false);
  });

  test('проверка rejected', () => {
    const rejectState = feedsReduce(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(rejectState.orders).toEqual([]);
    expect(rejectState.total).toEqual(0);
    expect(rejectState.totalToday).toEqual(0);
    expect(rejectState.isLoading).toEqual(false);
    expect(rejectState.error).toEqual('error');
  });
  test('проверка pending', () => {
    const pendingState = feedsReduce(initialState, getAllFeeds.pending(''));
    expect(pendingState.isLoading).toEqual(true);
  });
});
