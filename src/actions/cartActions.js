import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'

export const addItem = ({ id }, value) => {    
  const payload = {
    id,
    value
  }
  
  return {
    type: ADD_TO_CART,
    payload
  }
}

export const removeItem = ({ id }) => ({
  type: REMOVE_FROM_CART,
  payload: id
})

export const incrementCartQuantity = ({ id }, value) => {
  const payload = {
    id,
    value
  }

  return {
    type: INCREMENT_CART_QUANTITY,
    payload
  }
}

export const decrementCartQuantity = ({ id }, value) => {
  const payload = {
    id,
    value
  }

  return {
    type: DECREMENT_CART_QUANTITY,
    payload
  }
}