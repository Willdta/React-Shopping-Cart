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
        id: 1, name: 'Yeezys', price: 300, remaining: 5
      },  
      
      2: {
        id: 2, name: 'Github Sweater', price: 50, remaining: 10
      },
      
      3: {
        id: 3, name: 'Protein Powder', price: 30, remaining: 20
      }
    },

    cartItems: []
  }

  addItem = item => {
    const {
      cart,
      items,
      cartItems
    } = this.state

    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price
    }

    this.setState({
      cart: {
        ...cart,
        ids: [...cart.ids, item.id],
        quantity: {
          ...cart.quantity,
          [item.id]: cart.quantity[item.id] + 1
        }
      },
      cartItems: [...cartItems, cartItem]
    })
  }

  removeItem = itemId => {
    const { cart, items } = this.state

    this.setState({
      cart: {
        ...cart,
        ids: cart.ids.filter(id => id !== itemId),
        quantity: {
          ...cart.quantity,
          [itemId]: 0
        } 
      }
    })
  }

  render() {
    const { items, cart } = this.state

    return (
      <div className="App">
        <h1>Shopping Area</h1>
        {Object.values(items).map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>$ {item.price}</h2>
            <button onClick={() => this.addItem(item)}>Add To Cart</button>
          </div>
        ))}

        <hr style={{ 'marginTop': '200px' }} />

        <h1>Cart</h1>

        {cart.ids.length !== 0 ? Object.keys(items).map(id => (
          <div key={id}>
            {cart.quantity[id] > 0 && (
              <div>
                <h1>{items[id].name} x {cart.quantity[id]}</h1>
                <p>Price ${items[id].price}</p>
                <button onClick={() => this.removeItem(items[id].id)}>Remove From Cart</button>
              </div>
            )}
          </div>
        )) : <h1>No Items In Your Cart</h1>}
      </div>
    )
  }
}