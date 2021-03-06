import request from 'utils/request';
import { SET_CURRENT_USER_ORDERS, ERROR } from './types';

export const getCurrentUserOrders = id => {
  return dispatch => {
    return request('GET', `api/orders/${id}`)
      .then(response => {
        const orders = [...response.data.orders];
        dispatch(setCurrentUserOrders(orders));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const reportPayment = orderId => {
  return dispatch => {
    return request('PUT', 'api/order', {
      id: orderId,
      payment_status: 'Оплата произведена'
    }).catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.error
      });
    });
  };
};

export const reportReception = orderId => {
  return dispatch => {
    return request('PUT', 'api/order', {
      id: orderId,
      delivery_status: 'Получен'
    }).catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.error
      });
    });
  };
};

export const setCurrentUserOrders = orders => {
  return {
    type: SET_CURRENT_USER_ORDERS,
    payload: orders
  };
};
