import {
  ADD_TO_CART,
  RENDER_CART,
  RENDER_TOTAL,
  REMOVE_FROM_CART,
  // INCREMENT_CART_QUANTITY,
  // DECREMENT_CART_QUANTITY
} from '../actions/types'

const initialState = {
  cart: [],
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RENDER_CART:
      return { 
        ...state,
        cart: action.payload
      }

    case RENDER_TOTAL:
      return { 
        ...state,
        total: action.payload
      }

    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart, 
          { ...action.payload.item, quantity: action.payload.value }
        ],
        total: state.total + (action.payload.price * action.payload.value)
      }

    case REMOVE_FROM_CART:
    console.log(action.payload.price);
    console.log(action.payload.quantity);
    
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
        total: state.total - (action.payload.price * action.payload.quantity)
      }

    //   return {
    //     ...state,
    //     ids: [...state.ids, action.payload.id],
    //     quantity: {
    //       ...state.quantity,
    //       [action.payload.id]: state.quantity[action.payload.id] + action.payload.value
    //     }
    //   }

    // case INCREMENT_CART_QUANTITY:
    //   return {
    //     ...state,
    //     quantity: {
    //       ...state.quantity,
    //       [action.payload.id]: action.payload.value
    //     }
    //   }

    // case DECREMENT_CART_QUANTITY:
    //   return {
    //     ...state,
    //     quantity: {
    //       ...state.quantity,
    //       [action.payload.id]: action.payload.value
    //     }
    //   }

    // case REMOVE_FROM_CART:
    //   return {
    //     ...state,
    //     ids: state.ids.filter(id => id !== action.payload),
    //     quantity: {
    //       ...state.quantity,
    //       [action.payload]: 0
    //     }
    //   }

    default: 
      return state
  }
}