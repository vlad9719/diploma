import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  FILL_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  ORDER_SAVED,
  ERROR
} from './types';
import request from 'utils/request';

export const addToCart = product => {
  return dispatch => {
    dispatch(addCartItemActionCreator(product));
  };
};

export const changeItemQuantity = (id, quantity) => {
  return dispatch => {
    dispatch(changeItemQuantityActionCreator(id, quantity));
  };
};

export const fillCart = (order, history) => {
  return dispatch => {
    dispatch(fillCartActionCreator(order));
    history.push('/cart');
  };
};

export const removeItemFromCart = id => {
  return dispatch => {
    dispatch(removeItemFromCartActionCreator(id));
  };
};

export const clearCart = () => {
  return dispatch => {
    dispatch(clearCartActionCreator());
  };
};

export const confirmOrder = (history, items) => {
  return dispatch => {
    return request('POST', 'api/order', { items })
      .then(() => {
        dispatch(clearCartActionCreator());
        dispatch(orderSavedActionCreator());
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const addCartItemActionCreator = product => {
  return {
    type: ADD_TO_CART,
    payload: product
  };
};

export const changeItemQuantityActionCreator = (id, quantity) => {
  return {
    type: CHANGE_ITEM_QUANTITY,
    payload: {
      id,
      quantity
    }
  };
};

export const fillCartActionCreator = order => {
  return {
    type: FILL_CART,
    payload: order
  };
};

export const removeItemFromCartActionCreator = id => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: id
  };
};

export const clearCartActionCreator = () => {
  return {
    type: CLEAR_CART
  };
};

export const orderSavedActionCreator = () => {
  return {
    type: ORDER_SAVED
  };
};
