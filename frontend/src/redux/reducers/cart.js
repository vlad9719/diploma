import { ADD_TO_CART } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  let product;
  switch (action.type) {
    case ADD_TO_CART:
      product = state.items.find(item => {
        return item.id === action.payload.id;
      });

      if (product) {
        const newItems = state.items.map(item => {
          if (product.id === item.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });

        return {
          ...state,
          items: newItems
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    default:
      return state;
  }
}
