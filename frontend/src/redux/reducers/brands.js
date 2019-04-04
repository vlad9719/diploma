import { SET_BRANDS } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BRANDS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
