import { SET_CURRENT_USER_ORDERS } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ORDERS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
