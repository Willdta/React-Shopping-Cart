import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../actions/authActions'
import { history } from '../App'

class Login extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          this.props.signupUser(history)
        }}>Sign Up</button>
      </div>
    )
  }
}

export default connect(null, { signupUser })(Login)