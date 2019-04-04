import request from 'utils/request';
import { SET_BRANDS, ERROR } from './types';

export const getBrands = () => {
  return dispatch => {
    return request('GET', 'api/brands')
      .then(response => {
        const brands = [...response.data.brands];
        dispatch(setBrands(brands));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

export const setBrands = brands => {
  return {
    type: SET_BRANDS,
    payload: brands
  };
};
