import { RENDER_ITEMS, RENDER_CART } from './types'
import { database } from '../firebase'

export const renderItems = () => dispatch => {
  database.ref('items').once('value', snapshot => {
    dispatch({
      type: RENDER_ITEMS,
      payload: snapshot.val()
    })
  })
}

export const renderCart = () => (dispatch, getState) => {
  const uid = getState().auth.user

  database.ref(`users/${uid}/cart`).on('value', snapshot => {
    dispatch({
      type: RENDER_CART,
      payload: snapshot.val()
    })
  })
}

export const renderTotal = () => (dispatch, getState) => {
  const uid = getState().auth.user

  database.ref(`users/${uid}/total`).once('value', snapshot => {
    dispatch({
      type: 'RENDER_TOTAL',
      payload: snapshot.val()
    })
  })
}