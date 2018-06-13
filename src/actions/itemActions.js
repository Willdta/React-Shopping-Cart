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

export const renderCart = () => dispatch => {
  database.ref('cart').once('value', snapshot => {
    dispatch({
      type: RENDER_CART,
      payload: snapshot.val()
    })
  })
}

export const renderTotal = () => dispatch => {
  database.ref('total').once('value', snapshot => {
    dispatch({
      type: 'RENDER_TOTAL',
      payload: snapshot.val()
    })
  })
}