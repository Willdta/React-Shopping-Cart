import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'

import { database } from '../firebase'

export const addItem = (item, value) => dispatch => {
  database
    .ref(`items/${item.id}`)
    .update({ 
      ...item, 
      remaining: item.remaining - value, 
      quantity: item.quantity + value
    })
  
  // return {
  //   type: ADD_TO_CART,
  //   payload: { item, value }
  // }
}

export const removeItem = ({ id }) => dispatch => ({
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