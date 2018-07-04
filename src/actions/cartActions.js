import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from './types'

import { database } from '../firebase'

export const addItem = (item, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  // database
  //   .ref(`items/${item.id}`)
  //   .transaction(data => {
  //     return data !== null && { 
  //       ...data, 
  //       remaining: data.remaining - value, 
  //       quantity: data.quantity + value 
  //     }
  //   })
  //   .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + (item.price * value), 10))


      database
        .ref(`users/${uid}/cart`)
        .push({ ...item, quantity: value })



  //   })
  //   .then(() => {
  //     database
  //       .ref(`users/${uid}/cart/quantity`)
  //       .transaction(data => {
  //         return data !== isNaN && {
  //           ...data,
  //           [item.id]: value
  //         }
  //       })
  //   })
  //   .then(() => {
  //     database
  //       .ref(`users/${uid}/cart/ids`)
  //       .push(item.id)
  //   })
  //   .then(() => {
      dispatch({
        type: ADD_TO_CART,
        payload: { 
          item,
          price: item.price, 
          value 
        }
      })
  //   })
}

export const removeItem = item  => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`users/${uid}/cart/ids`)
    .remove()
    .then(() => {
      database
        .ref(`users/${uid}/cart/quantity`)
        .transaction(data => {
          return data !== isNaN && {
            ...data,
            [item.id]: 0
          }
        })
    })
    .then(() => {
      database
        .ref(`items/${item.id}`)
        .transaction(data => {
          return data !== null && {
            ...data,
            remaining: 5,
            quantity: 0
          }
        })
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data - (item.price * item.quantity), 10))
    })
    .then(() => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: item.id
      })
    })
}

export const incrementCartQuantity = (item, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`items/${item.id}`)
    .transaction(data => {
      return data !== null && {
        ...data,
        remaining: data.remaining - Math.abs(data.quantity - value),
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/cart/quantity`)
        .transaction(data => {
          return data !== isNaN && {
            ...data,
            [item.id]: value
          }
        })
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data + item.price * Math.abs(item.quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: INCREMENT_CART_QUANTITY,
        payload: { id: item.id, value }
      })
    })
}

export const decrementCartQuantity = (item, value) => (dispatch, getState) => {
  const uid = getState().auth.user

  database
    .ref(`items/${item.id}`)
    .transaction(data => {
      return data !== null && {
        ...data,
        remaining: data.remaining + Math.abs(data.quantity - value),
        quantity: value
      }
    })
    .then(() => {
      database
        .ref(`users/${uid}/cart/quantity`)
        .transaction(data => {
          return data !== isNaN && {
            ...data,
            [item.id]: value
          }
        })
    })
    .then(() => {
      database
        .ref(`users/${uid}/total`)
        .transaction(data => parseInt(data - item.price * Math.abs(item.quantity - value), 10))
    })
    .then(() => {
      dispatch({
        type: DECREMENT_CART_QUANTITY,
        payload: { id: item.id, value }
      })
    })
}