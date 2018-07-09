import { LOGGED_IN, LOGGED_OUT } from '../actions/types'

export default (state = {}, action) => {
  switch(action.type) {
    case LOGGED_IN:
      return {
        user: action.payload
      }
    
    case LOGGED_OUT:
      return {}

    default:
      return state
  }
}