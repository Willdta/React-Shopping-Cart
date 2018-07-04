import {
  ADD_TO_CART,
  ADD_QUANTITY,
  RENDER_CART,
  RENDER_TOTAL,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
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

    case ADD_QUANTITY:
      const { i, value } = action.payload

      return {
        ...state,
        cart: [
          ...state.cart.slice(0, i),
          { ...state.cart[i], quantity: state.cart[i].quantity + value },
          ...state.cart.slice(i + 1)
        ],
        total: state.total + (state.cart[i].price * value)
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
        total: state.total - (action.payload.price * action.payload.quantity)
      }

    case INCREMENT_CART_QUANTITY:
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, action.payload.i),
          { ...state.cart[action.payload.i], quantity: action.payload.value },
          ...state.cart.slice(action.payload.i + 1)
        ], 
        total: state.total + action.payload.cartItem.price * Math.abs(action.payload.cartItem.quantity - action.payload.value)
      }

    case DECREMENT_CART_QUANTITY:
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, action.payload.i),
          { ...state.cart[action.payload.i], quantity: action.payload.value },
          ...state.cart.slice(action.payload.i + 1)
        ], 
        total: state.total - action.payload.cartItem.price * Math.abs(action.payload.cartItem.quantity - action.payload.value)
      }
      
    default: 
      return state
  }
}