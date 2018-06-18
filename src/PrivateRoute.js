import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
)

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: !!auth.user
  }
}

export default connect(mapStateToProps)(PrivateRoute)