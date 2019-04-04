import request from 'utils/request';
import { SET_CATEGORIES, ERROR } from './types';

export const getCategories = brand => {
  return dispatch => {
    return request('GET', `api/categories?brand=${brand}`)
      .then(response => {
        const categories = [...response.data.categories];
        dispatch(setCategories(categories));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    payload: categories
  };
};
