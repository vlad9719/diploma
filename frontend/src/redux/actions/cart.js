import { ADD_TO_CART } from './types';

export const addToCart = product => {
  return dispatch => {
    dispatch(addCartItemActionCreator(product));
  };
};

export const addCartItemActionCreator = product => {
  return {
    type: ADD_TO_CART,
    payload: product
  };
};
