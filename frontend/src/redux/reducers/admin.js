import { SET_ALL_ORDERS, SET_ALL_USERS } from '../actions/types';

const initialState = {
  orders: [],
  users: []
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
    default:
      return state;
  }
}
