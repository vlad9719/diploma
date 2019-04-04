import { SET_PRODUCTS } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
