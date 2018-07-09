import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer'
import cartReducer from './cartReducer'
import authReducer from './authReducer'

export default combineReducers({
  items: itemsReducer,
  cart: cartReducer,
  auth: authReducer
})