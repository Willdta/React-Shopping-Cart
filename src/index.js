import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { checkLogin, checkLogout } from './actions/authActions'
import { auth } from './firebase'

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(checkLogin(user.uid))
    ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'))
  } else {
    store.dispatch(checkLogout())
    ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'))
  }
})