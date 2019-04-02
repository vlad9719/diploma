import { combineReducers } from 'redux';
import commonReducer from './common';
import userReducer from './user';
import errorReducer from './error';

export default combineReducers({
  common: commonReducer,
  user: userReducer,
  errors: errorReducer
});
