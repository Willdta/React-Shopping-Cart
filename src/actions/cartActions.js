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

  database
    .ref('total')
    .transaction(data => parseInt(data + (item.price * value), 10))

  database
    .ref('cart/ids')
    .push(item.id)

  database
    .ref('cart/quantity')
    .update({
      [item.id]: value
    })
  
  // return {
  //   type: ADD_TO_CART,
  //   payload: { item, value }
  // }
}

export const removeItem = item  => dispatch => {
  database.ref(`items/${item.id}`).update({
    ...item,
    remaining: 5,
    quantity: 0
  })
  
  database.ref('cart/quantity').update({
    [item.id]: 0
  })

  database
    .ref('total')
    .transaction(data => parseInt(data - (item.price * item.quantity), 10))

  database.ref('cart/ids').remove()

  // type: REMOVE_FROM_CART,
  // payload: id
}

export const incrementCartQuantity = (item, value) => dispatch => {
  database.ref(`items/${item.id}`)
    .update({
      ...item,
      remaining: item.remaining - Math.abs(item.quantity - value),
      quantity: value
    })

  database.ref('cart/quantity')
    .update({
      [item.id]: value
    })

  database
    .ref('total')
    .transaction(data => parseInt(data + item.price * Math.abs(item.quantity - value), 10))

  // type: INCREMENT_CART_QUANTITY,
  // payload: { id, value }
}

export const decrementCartQuantity = (item, value) => dispatch => {
  database.ref(`items/${item.id}`)
  .update({
    ...item,
    remaining: item.remaining + Math.abs(item.quantity - value),
    quantity: value
  })

  database.ref('cart/quantity')
    .update({
      [item.id]: value
    })

  database
    .ref('total')
    .transaction(data => parseInt(data - item.price * Math.abs(item.quantity - value), 10))
 
  // type: DECREMENT_CART_QUANTITY,
  // payload: { id, value }
}