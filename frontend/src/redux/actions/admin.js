import request from 'utils/request';
import { SET_ALL_ORDERS, ERROR } from './types';

export const getAllOrders = () => {
  return dispatch => {
    return request('GET', `api/admin/orders`)
      .then(response => {
        const orders = [...response.data.orders];
        dispatch(setAllOrders(orders));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const setAllOrders = orders => {
  return {
    type: SET_ALL_ORDERS,
    payload: orders
  };
};
