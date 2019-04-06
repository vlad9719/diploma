import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  ORDER_SAVED
} from '../actions/types';

const initialState = {
  items: [],
  orderSaved: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        orderSaved: false
      };
    case CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              quantity: action.payload.quantity
            };
          }

          return item;
        })
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.id !== action.payload;
        })
      };
    case CLEAR_CART:
      return {
        ...state,
        items: initialState.items
      };
    case ORDER_SAVED:
      return {
        ...state,
        orderSaved: true
      };
    default:
      return state;
  }
}
