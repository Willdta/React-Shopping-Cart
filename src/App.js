import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  state = {
    cart: {
      ids: [],
      quantity: {
        1: 0, 
        2: 0, 
        3: 0
      }
    },

    items: {
      1: {
        id: 1, name: 'Yeezys', price: 300, available: 5
      },  
      
      2: {
        id: 2, name: 'Github Sweater', price: 50, available: 10
      },
      
      3: {
        id: 3, name: 'Protein Powder', price: 30, available: 20
      }
    },

    cartItems: []
  }

  render() {
    return (
      <h1>Shopping Cart</h1>
    )
  }
}