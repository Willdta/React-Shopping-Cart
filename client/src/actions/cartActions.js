import {
  ADD_TO_CART,
  ADD_QUANTITY,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'
import { database } from '../firebase'
import axios from 'axios'

export const addItem = (item, value) => (dispatch, getState) => {
  const uid = getState().auth.user
  const { price } = item

  database
    .ref(`users/${uid}/cart`)
    .push({ ...item, quantity: value })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + (price * value), 10))
    })
    .then(() => {
      dispatch({
        type: ADD_TO_CART,
        payload: { 
          item,
          price, 
          value 
        }
      })
    })
}

export const addQuantity = ({ price, key }, i, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${key}`)
    .transaction(data => {
      return data !== null && {
        ...data,
        quantity: data.quantity + value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => data + parseInt(price * value, 10))
    })
    .then(() => {
      dispatch({
        type: ADD_QUANTITY,
        payload: { i, value }
      })
    })
}

export const removeItem = ({ id, price, quantity, key }) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${key}`)
    .remove()
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => data - parseInt(price * quantity, 10))
    })
    .then(() => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { 
          id, 
          quantity,
          price
        }
      })
    })
}

export const incrementCartQuantity = ({ key, price, quantity }, i, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${key}`)
    .transaction(data => {
      return data !== isNaN && {
        ...data,
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + price * Math.abs(quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: INCREMENT_CART_QUANTITY,
        payload: { i, value, price, quantity }
      })
    })
}

export const decrementCartQuantity = ({ key, price, quantity }, i, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/${key}`)
    .transaction(data => {
      return data !== isNaN && {
        ...data,
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data - price * Math.abs(quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: DECREMENT_CART_QUANTITY,
        payload: { i, value, price, quantity }
      })
    })
}

export const toggleMessage = () => ({
  type: 'TOGGLE_MESSAGE'
})

export const sendMail = message => dispatch => {
  axios
    .post('/sendMail', message)
    .then(res => res && dispatch({ type: 'EMAIL_SENT' }))
    .catch(err => err && dispatch({ type: 'EMAIL_FAIL' }))
}