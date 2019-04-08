import { SET_ALL_ORDERS } from '../actions/types';

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
    default:
      return state;
  }
}
