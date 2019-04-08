import request from 'utils/request';
import {
  SET_ALL_ORDERS,
  ERROR,
  SET_ALL_USERS,
  SET_ONE_USER_ORDERS
} from './types';

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

export const getOneUserOrders = userId => {
  return dispatch => {
    return request('GET', `api/admin/orders/${userId}`)
      .then(response => {
        const orders = [...response.data.orders];
        dispatch(setOneUserOrders(orders));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const updateOrderDeliveryStatus = (orderId, status) => {
  return dispatch => {
    return request('PUT', `api/admin/order`, {
      id: orderId,
      delivery_status: status
    })
      .then(() => {
        return request('GET', `api/admin/orders`).then(response => {
          const orders = [...response.data.orders];
          dispatch(setAllOrders(orders));
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const updateOrderPaymentStatus = (orderId, status) => {
  return dispatch => {
    return request('PUT', `api/admin/order`, {
      id: orderId,
      payment_status: status
    })
      .then(() => {
        return request('GET', `api/admin/orders`).then(response => {
          const orders = [...response.data.orders];
          dispatch(setAllOrders(orders));
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const setPrice = (orderId, price) => {
  return dispatch => {
    return request('PUT', `api/admin/order`, {
      id: orderId,
      price
    })
      .then(() => {
        return request('GET', `api/admin/orders`).then(response => {
          const orders = [...response.data.orders];
          dispatch(setAllOrders(orders));
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const deleteOrder = (orderId) => {
  return dispatch => {
    return request('DELETE', `api/order/${orderId}`)
      .then(() => {
        return request('GET', `api/admin/orders`).then(response => {
          const orders = [...response.data.orders];
          dispatch(setAllOrders(orders));
        });
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

export const setOneUserOrders = orders => {
  return {
    type: SET_ONE_USER_ORDERS,
    payload: orders
  };
};
