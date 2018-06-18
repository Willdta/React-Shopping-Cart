import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkLogin, checkLogout } from './actions/authActions'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import GuestRoute from './GuestRoute'
import RenderItems from './components/RenderItems'
import ViewItem from './components/ViewItem'
import RenderCart from './components/RenderCart'
import Login from './components/Login'
import './App.css'

export const history = createHistory()

class App extends Component {  
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <GuestRoute exact path="/" component={Login} />
            <PrivateRoute exact path="/shop" component={RenderItems} />
            <PrivateRoute exact path="/item/:id" component={ViewItem} />
            <PrivateRoute exact path="/cart" component={RenderCart} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect(null, { checkLogin, checkLogout })(App)