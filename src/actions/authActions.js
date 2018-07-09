import { LOGGED_IN, LOGGED_OUT } from './types'
import { firebase, auth } from '../firebase'

export const signupUser = history => dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider() 

  auth.signInWithPopup(provider).then(() => {
    history.push('/shop')
  })
}

export const signoutUser = () => dispatch => {
  auth.signOut()
}

export const checkLogin = uid => ({
  type: LOGGED_IN,
  payload: uid
})

export const checkLogout = () => ({
  type: LOGGED_OUT
})