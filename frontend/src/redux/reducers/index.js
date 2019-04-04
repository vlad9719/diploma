import { combineReducers } from 'redux';
import commonReducer from './common';
import userReducer from './user';
import errorReducer from './error';
import brandsReducer from './brands';

export default combineReducers({
  common: commonReducer,
  user: userReducer,
  errors: errorReducer,
  brands: brandsReducer
});
