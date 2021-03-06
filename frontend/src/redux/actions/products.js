import request from 'utils/request';
import { SET_PRODUCTS, ERROR } from './types';

export const getProducts = category => {
  return dispatch => {
    return request('GET', `api/products?category=${category}`)
      .then(response => {
        const products = [...response.data.products];
        dispatch(setProducts(products));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const search = (history, name) => {
  return dispatch => {
    return request('GET', `api/search?name=${name}`)
      .then(response => {
        const products = [...response.data.products];
        dispatch(setProducts(products));
        history.push(`/search/${name}`);
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    payload: products
  };
};
