import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'

export const addItem = ({ id }, value) => ({    
  type: ADD_TO_CART,
  payload: { id, value }
})

export const removeItem = ({ id }) => ({
  type: REMOVE_FROM_CART,
  payload: id
})

export const incrementCartQuantity = ({ id }, value) => ({
  type: INCREMENT_CART_QUANTITY,
  payload: { id, value }
})

export const decrementCartQuantity = ({ id }, value) => ({
  type: DECREMENT_CART_QUANTITY,
  payload: { id, value }
})