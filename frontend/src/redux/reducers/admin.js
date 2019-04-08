import { SET_ALL_ORDERS, SET_ALL_USERS, SET_ONE_USER_ORDERS } from '../actions/types';

const initialState = {
  orders: [],
  users: [],
  userOrders: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_ONE_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      };
    default:
      return state;
  }
}
