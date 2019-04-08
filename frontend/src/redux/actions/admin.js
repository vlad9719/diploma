import request from 'utils/request';
import { SET_ALL_ORDERS, ERROR, SET_ALL_USERS } from './types';

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


export const getAllUsers = () => {
  return dispatch => {
    return request('GET', `api/admin/users`)
      .then(response => {
        const users = [...response.data.users];
        dispatch(setAllUsers(users));
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

export const setAllUsers = users => {
  return {
    type: SET_ALL_USERS,
    payload: users
  };
};
