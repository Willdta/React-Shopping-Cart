import React from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../actions/authActions'
import { history } from '../App'

const Login = ({ signupUser }) => {
  return (
    <div className="login-container">
      <h1>React E-Commerce</h1>
      <button 
        onClick={() => signupUser(history)}
        className="login-button auth-button"
      >
        Sign In
      </button>
    </div>
  )
}

export default connect(null, { signupUser })(Login)