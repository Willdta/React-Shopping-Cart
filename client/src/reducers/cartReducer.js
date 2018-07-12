import {
  ADD_TO_CART,
  ADD_QUANTITY,
  RENDER_CART,
  RENDER_TOTAL,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY,
  TOGGLE_MESSAGE,
  EMAIL_SENT,
  EMAIL_FAIL
} from '../actions/types'

const initialState = {
  cart: [],
  total: 0,
  emailSent: false
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

    case ADD_TO_CART: {
      const { item, value, price } = action.payload
      const { cart, total } = state

      return {
        ...state,
        cart: [
          ...cart, 
          { ...item, quantity: value }
        ],
        total: total + (price * value)
      }
    }

    case ADD_QUANTITY: {
      const { i, value } = action.payload
      const { cart, total } = state
      
      return {
        ...state,
        cart: [
          ...cart.slice(0, i),
          { ...cart[i], quantity: cart[i].quantity + value },
          ...cart.slice(i + 1)
        ],
        total: total + (cart[i].price *value)
      }
    }
    
    case REMOVE_FROM_CART: {
      const { id, price, quantity } = action.payload
      const { cart, total } = state
      
      return {
        ...state,
        cart: cart.filter(item => item.id !== id),
        total: total - (price * quantity)
      }
    }
    
    case INCREMENT_CART_QUANTITY: {
      const { i, value, price, quantity } = action.payload
      const { cart, total } = state
      
      return {
        ...state,
        cart: [
          ...cart.slice(0, i),
          { ...cart[i], quantity: value },
          ...cart.slice(i + 1)
        ], 
        total: total + price * Math.abs(quantity - value)
      }
    }
    
    case DECREMENT_CART_QUANTITY: {
      const { i, value, price, quantity } = action.payload
      const { cart, total } = state
      
      return {
        ...state,
        cart: [
          ...cart.slice(0, i),
          { ...cart[i], quantity: value },
          ...cart.slice(i + 1)
        ], 
        total: total - price * Math.abs(quantity - value)
      }
    }

    case EMAIL_SENT:
      return {
        ...state,
        cart: [],
        total: 0,
        emailSent: true
      }

    case EMAIL_FAIL:
      return {
        ...state,
        emailSent: false
      }

    case TOGGLE_MESSAGE:
      return {
        ...state,
        emailSent: !state.emailSent
      }
      
    default: 
      return state
  }
}