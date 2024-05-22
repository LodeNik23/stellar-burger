import { expect, test } from '@jest/globals';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

test('Инициализация rootReducer успешна', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  const action = { type: 'UNKNOWN_ACTION' };
  const testState = rootReducer(undefined, action);
  expect(testState).toEqual(store.getState());
});
