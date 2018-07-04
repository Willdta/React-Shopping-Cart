import { RENDER_CART, RENDER_TOTAL } from './types'
import { database } from '../firebase'

// export const renderItems = () => dispatch => {
//   database.ref('items').once('value', snapshot => {
//     dispatch({
//       type: RENDER_ITEMS,
//       payload: snapshot.val()
//     })
//   })
// }

export const renderCart = () => (dispatch, getState) => {
  const uid = getState().auth.user

  database.ref(`users/${uid}/cart`).on('value', snapshot => {
    const data = []

    snapshot.forEach(child => {
      data.push({
        key: child.key,
        ...child.val()
      })
    })

    dispatch({
      type: RENDER_CART,
      payload: data
    })
  })
}

export const renderTotal = () => (dispatch, getState) => {
  const uid = getState().auth.user

  database.ref(`users/${uid}/total`).once('value', snapshot => {
    dispatch({
      type: RENDER_TOTAL,
      payload: snapshot.val()
    })
  })
}