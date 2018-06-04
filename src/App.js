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
    const { items, cart } = this.state

    return (
      <div className="App">
        <h1>Shopping Area</h1>
        {Object.values(items).map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>{item.price}</h2>
            <button onClick={() => this.addItem(item)}>Add To Cart</button>
          </div>
        ))}
      </div>
    )
  }
}