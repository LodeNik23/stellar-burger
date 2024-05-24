import { describe, expect, test } from '@jest/globals';
import {
  userReduce,
  initialState,
  register,
  login,
  apiGetUser,
  updateUser,
  logout
} from './users';

describe('тестs users', () => {
  const userdata = {
    email: 'crispy@grenka.ru',
    name: 'buterwithcucumber',
    password: 'kombucha'
  };

  const userRespData = {
    success: true,
    user: {
      email: 'crispy@grenka.ru',
      name: 'buterwithcucumber'
    }
  };
  const userPath = {
    ...initialState,
    isAuthChecked: true,
    user: {
      email: 'crispy@grenka.ru',
      name: 'buterwithcucumber'
    }
  };
  const userUpdateData = {
    success: true,
    user: {
      email: 'bender@robot.ru',
      name: 'Future'
    }
  };
  const userUpdatePath = {
    ...initialState,
    isAuthChecked: true,
    user: {
      email: 'bender@robot.ru',
      name: 'Future'
    }
  };

  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userReduce(initialState, action);

  describe('тестs register', () => {
    test('тест fulfilled', () => {
      const doIt = {
        type: register.fulfilled.type,
        payload: userRespData
      };
      expect(stateConstructor(doIt)).toEqual(userPath);
    });

    test('тест rejected', () => {
      const rejectedReg = userReduce(
        initialState,
        register.rejected(new Error('error'), 'тестовая ошибка', userdata)
      );
      expect(rejectedReg.error).toEqual('error');
    });

    test('тест pending', () => {
      const pendingReg = userReduce(
        initialState,
        register.pending('', userdata)
      );
      expect(pendingReg.isAuthChecked).toEqual(false);
      expect(pendingReg.error).toEqual('');
    });
  });
  describe('тестs login', () => {
    test('тест fulfilled', () => {
      const doIt = {
        type: login.fulfilled.type,
        payload: userRespData
      };
      expect(stateConstructor(doIt)).toEqual(userPath);
    });

    test('тест rejected', () => {
      const rejectedLog = userReduce(
        initialState,
        login.rejected(new Error('error'), 'тестовая ошибка', userdata)
      );
      expect(rejectedLog.error).toEqual('error');
      expect(rejectedLog.isAuthChecked).toEqual(false);
    });

    test('тест pending', () => {
      const pendingLog = userReduce(initialState, login.pending('', userdata));
      expect(pendingLog.isAuthChecked).toEqual(false);
      expect(pendingLog.error).toEqual('');
    });
  });
  describe('тестs apiGetUser', () => {
    test('тест fulfilled', () => {
      const doIt = {
        type: apiGetUser.fulfilled.type,
        payload: userRespData
      };
      expect(stateConstructor(doIt)).toEqual(userPath);
    });

    test('тест rejected', () => {
      const rejectedGet = userReduce(
        initialState,
        apiGetUser.rejected(new Error('error'), 'тестовая ошибка')
      );
      expect(rejectedGet.error).toEqual('error');
      expect(rejectedGet.isAuthChecked).toEqual(false);
    });
  });
  describe('тестs updateUser', () => {
    test('тест fulfilled', () => {
      const doIt = {
        type: updateUser.fulfilled.type,
        payload: userUpdateData
      };
      expect(stateConstructor(doIt)).toEqual(userUpdatePath);
    });
    test('тест rejected', () => {
      const rejectedUpdate = userReduce(
        initialState,
        updateUser.rejected(new Error('error'), 'тестовая ошибка', userdata)
      );
      expect(rejectedUpdate.error).toEqual('error');
      expect(rejectedUpdate.isAuthChecked).toEqual(false);
    });

    test('тест pending', () => {
      const pendingUpdate = userReduce(
        initialState,
        updateUser.pending('', userdata)
      );
      expect(pendingUpdate.isAuthChecked).toEqual(false);
      expect(pendingUpdate.error).toEqual('');
    });
  });

  describe('тестs logout', () => {
    test('тест fulfilled', () => {
      const doIt = {
        type: logout.fulfilled.type,
        payload: userRespData
      };
      expect(stateConstructor(doIt)).toEqual(initialState);
      expect(stateConstructor(doIt)).toEqual(initialState);
    });
  });
});
