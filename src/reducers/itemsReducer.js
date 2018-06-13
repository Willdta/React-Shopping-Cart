import {
  RENDER_ITEMS,
  RENDER_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from '../actions/types'

const initialState = {
  items: null,
  cart: null,
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RENDER_ITEMS:
      return { ...state, items: action.payload }
    
    case RENDER_CART:
      return { ...state, cart: action.payload }
    
    case 'RENDER_TOTAL':
      return { ...state, total: action.payload }

    case ADD_TO_CART:
      return { 
        ...state,
        items: {
          ...state.items, 
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining - action.payload.value,
            quantity: state.items[action.payload.id].quantity + action.payload.value
          }
        },
        total: state.total + (state.items[action.payload.id].price * action.payload.value)
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            ...state.items[action.payload],
            remaining: 5,
            quantity: 0
          }
        },
        total: state.total - (state.items[action.payload].price * state.items[action.payload].quantity)
      }

    case INCREMENT_CART_QUANTITY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining - Math.abs(state.items[action.payload.id].quantity - action.payload.value),
            quantity: action.payload.value
          }
        },
        total: state.total + state.items[action.payload.id].price * Math.abs(state.items[action.payload.id].quantity - action.payload.value)
      }
      
    case DECREMENT_CART_QUANTITY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining + Math.abs(state.items[action.payload.id].quantity - action.payload.value),
            quantity: action.payload.value
          }
        },
        total: state.total - state.items[action.payload.id].price * Math.abs(state.items[action.payload.id].quantity - action.payload.value)
      }

    default:
      return state
  }
}