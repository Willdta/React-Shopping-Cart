import {
  ADD_TO_CART,
  ADD_QUANTITY,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'

import { database } from '../firebase'

export const addItem = (item, value) => (dispatch, getState) => {
  const uid = getState().auth.user
  
  database
    .ref(`users/${uid}/cart`)
    .push({ ...item, quantity: value })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + (item.price * value), 10))
    })
    .then(() => {
      dispatch({
        type: ADD_TO_CART,
        payload: { 
          item,
          price: item.price, 
          value 
        }
      })
    })
}

export const addQuantity = (i, value, cart) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${cart.key}`)
    .transaction(data => {
      return data !== null && {
        ...data,
        quantity: data.quantity + value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => data + parseInt(cart.price * value, 10))
    })
    .then(() => {
      dispatch({
        type: ADD_QUANTITY,
        payload: { i, value }
      })
    })
}

export const removeItem = (item, index) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${index}`)
    .remove()
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => data - parseInt(item.price * item.quantity, 10))
    })
    .then(() => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { 
          item, 
          id: item.id, 
          quantity: item.quantity,
          index,
          price: item.price
        }
      })
    })
}

export const incrementCartQuantity = (cartItem, i, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${cartItem.key}`)
    .transaction(data => {
      return data !== isNaN && {
        ...data,
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + cartItem.price * Math.abs(cartItem.quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: INCREMENT_CART_QUANTITY,
        payload: { i, value, cartItem }
      })
    })
}

export const decrementCartQuantity = (cartItem, i, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${cartItem.key}`)
    .transaction(data => {
      return data !== isNaN && {
        ...data,
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data - cartItem.price * Math.abs(cartItem.quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: DECREMENT_CART_QUANTITY,
        payload: { i, value, cartItem }
      })
    })
}