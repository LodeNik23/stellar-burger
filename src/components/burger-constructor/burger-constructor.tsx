import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getOrderRequest,
  getBurgerOrtder,
  getOrderModalData,
  resetOrder
} from '../../services/slices/newOrder';
import { useNavigate } from 'react-router-dom';
import {
  getConstructor,
  resetConstructor
} from '../../services/slices/constructor';
import { isAuthCheckedSelector, getUser } from '../../services/slices/users';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.burger);
  const dispatch = useDispatch();
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuth = useSelector(isAuthCheckedSelector);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient.id)
    ];

    dispatch(getBurgerOrtder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
