import { RENDER_ITEMS } from './types'
import { database } from '../firebase'

export const renderItems = () => dispatch => {
  database.ref('items').on('value', snapshot => {
    dispatch({
      type: RENDER_ITEMS,
      payload: snapshot.val()
    })
  })
}