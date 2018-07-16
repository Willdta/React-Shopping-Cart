import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './routes/PrivateRoute'
import GuestRoute from './routes/GuestRoute'
import RenderItems from './components/RenderItems'
import ViewItem from './components/ViewItem'
import RenderCart from './components/RenderCart'
import Login from './components/Login'
import Checkout from './components/Checkout'
import ThankYou from './components/ThankYou'
import './App.css'

export const history = createHistory()

const App = () => (
  <div className="App">
    <Router history={history}>
      <Switch>
        <GuestRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/shop" component={RenderItems} />
        <PrivateRoute exact path="/item/:id" component={ViewItem} />
        <PrivateRoute exact path="/cart" component={RenderCart} />
        <PrivateRoute exact path="/checkout" component={Checkout} />
        <PrivateRoute exact path="/thank-you" component={ThankYou} />
      </Switch>
    </Router>
  </div>
)  

export default App