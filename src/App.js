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
      },
    },

    items: {
      1: {
        id: 1, name: 'Yeezys', price: 300, remaining: 5
      },  
      
      2: {
        id: 2, name: 'Github Sweater', price: 50, remaining: 5
      },
      
      3: {
        id: 3, name: 'Protein Powder', price: 30, remaining: 5
      }
    },

    total: 0
  }

  addItem = item => {
    const {
      cart,
      items,
      total
    } = this.state
    
    console.log(items[item.id].remaining - 1)

    this.setState({
      cart: {
        ...cart,
        ids: [...cart.ids, item.id],
        quantity: {
          ...cart.quantity,
          [item.id]: cart.quantity[item.id] + 1
        },
      },
      items: {
        ...items,
        [item.id]: {
          ...item,
          remaining: item.remaining - 1
        }
      },
      total: total + item.price,
    })
  }

  removeItem = item => {
    const { cart, items, total } = this.state

    this.setState({
      cart: {
        ...cart,
        ids: cart.ids.filter(id => id !== item.id),
        quantity: {
          ...cart.quantity,
          [item.id]: 0
        },
      },
      items: {
        ...items,
        [item.id]: {
          ...item,
          remaining: 5
        }
      },
      total: total - (items[item.id].price * cart.quantity[item.id])
    })
  }

  render() {
    const { items, cart, total } = this.state

    return (
      <div className="App">
        <h1>Shopping Area</h1>
        {Object.values(items).map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>$ {item.price}</h2>
            {item.remaining === 0 ? (
              <p style={{ 'color': 'red' }}>Sold Out</p>
            ) : (
              <button onClick={() => this.addItem(item)}>Add To Cart</button>
            )}
          </div>
        ))}

        <hr style={{ 'margin': '100px' }} />

        <h1>Cart</h1>

        {cart.ids.length !== 0 ? Object.keys(items).map(id => (
          <div key={id}>
            {cart.quantity[id] > 0 && (
              <div>
                <h1>{items[id].name} x {cart.quantity[id]}</h1>
                <p>Price ${items[id].price * cart.quantity[id]}</p>
                <button onClick={() => this.removeItem(items[id])}>Remove From Cart</button>
              </div>
            )}
          </div>
        )) : <h1>No Items In Your Cart</h1>}
        
        { total > 0 && <h1>Total Price: ${total}</h1> }
      </div>
    )
  }
}