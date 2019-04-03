import request from 'utils/request';
import { ERROR, SET_CURRENT_USER, SET_UPDATING_USER_STATUS } from './types';
import { setToken, unsetToken } from '../../utils/request';
import { unsetErrors } from './error';

export const login = (history, userData) => {
  return async dispatch => {
    return request('POST', 'api/auth/login', userData)
      .then(response => {
        const token = response.data.Token;
        setToken(token);
        return request('POST', 'api/auth/me');
      })
      .then(response => {
        const user = response.data.User;
        dispatch(setCurrentUser(user));
        history.push('/home');
      })
      .catch(err => {
        const error = err.response.data.error;
        dispatch({
          type: ERROR,
          payload: { login: error }
        });
      });
  };
};

export const update = userData => {
  return dispatch => {
    return request('PUT', 'api/user', userData)
      .then(response => {
        dispatch(setUpdatingUserStatus(false));
        dispatch(setCurrentUser(response.data.User));
      })
      .catch(err => {
        const errors = err.response.data.error;
        dispatch({
          type: ERROR,
          payload: {
            update: errors
          }
        });
      });
  };
};

export const register = (history, userData) => {
  return dispatch => {
    return request('POST', 'api/auth/register', userData)
      .then(() => {
        history.push('/login');
      })
      .catch(err => {
        const errors = err.response.data.error;
        dispatch({
          type: ERROR,
          payload: {
            register: errors
          }
        });
      });
  };
};

export const me = () => {
  return dispatch => {
    return request('POST', 'api/auth/me')
      .then(response => {
        const user = response.data.User;
        dispatch(setCurrentUser(user));
      })
      .catch(err => {
        dispatch(setCurrentUser({}));
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  };
};

export const setUpdatingUserStatus = (status) => {
  return dispatch => {
    dispatch({
      type: SET_UPDATING_USER_STATUS,
      payload: status
    });
  };
};

export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  };
};

export const logoutUser = history => dispatch => {
  return request('POST', 'api/auth/logout').then(() => {
    unsetToken();
    dispatch(setCurrentUser({}));
    history.push('/home');
  });
};
