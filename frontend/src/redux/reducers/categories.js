import { SET_CATEGORIES } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
