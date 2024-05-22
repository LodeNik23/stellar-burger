import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders } from '../../services/slices/orders';
import { getOrdersFeeds } from '../../services/slices/feeds';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getOrdersFeeds);
  //(state)=>state.orders.orders);

  return <ProfileOrdersUI orders={orders} />;
};
