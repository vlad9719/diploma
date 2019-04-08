import { combineReducers } from 'redux';
import commonReducer from './common';
import userReducer from './user';
import errorReducer from './error';
import brandsReducer from './brands';
import categoriesReducer from './categories';
import productsReducer from './products';
import cartReducer from './cart';
import ordersReducer from './orders';
import adminReducer from './admin';

export default combineReducers({
  common: commonReducer,
  user: userReducer,
  errors: errorReducer,
  brands: brandsReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  admin: adminReducer
});
