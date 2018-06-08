import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import RenderItems from './components/RenderItems'
import ViewItem from './components/ViewItem'
import RenderCart from './components/RenderCart'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={RenderItems} />
            <Route exact path="/item/:id" component={ViewItem} />
            <Route exact path="/cart" component={RenderCart} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}