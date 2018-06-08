import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import RenderItems from './components/RenderItems'
import RenderCart from './components/RenderCart'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={RenderItems} />
            <Route exact path="/cart" component={RenderCart} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}