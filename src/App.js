import React, { Component } from 'react'
import './App.css'
import RenderItems from './components/RenderItems'
import RenderCart from './components/RenderCart'
import Total from './components/Total'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <RenderItems />
        <RenderCart />
        <Total />
      </div>
    )
  }
}