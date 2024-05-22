import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReduce } from './slices/ingredients';
import { userReduce } from './slices/users';
import { burgerReduce } from './slices/constructor';
import { feedsReduce } from './slices/feeds';
import { ordersReduce } from './slices/orders';
import { newOrderReduce } from './slices/newOrder';

export const rootReducer = combineReducers({
  ingredients: ingredientsReduce,
  user: userReduce,
  burger: burgerReduce,
  feeds: feedsReduce,
  orders: ordersReduce,
  newOrder: newOrderReduce
});
