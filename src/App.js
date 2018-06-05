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
        id: 1, name: 'Yeezys', price: 300, remaining: 5, quantity: 0
      },  
      
      2: {
        id: 2, name: 'Github Sweater', price: 50, remaining: 5, quantity: 0
      },
      
      3: {
        id: 3, name: 'Protein Powder', price: 30, remaining: 5, quantity: 0
      }
    },

    total: 0,
    removeQuantity: 0
  }

  addItem = item => {
    const {
      cart,
      items,
      total
    } = this.state

    this.setState({
      cart: {
        ...cart,
        ids: [...cart.ids, item.id],
        quantity: {
          ...cart.quantity,
          [item.id]: cart.quantity[item.id] + items[item.id].quantity
        },
      },
      items: {
        ...items,
        [item.id]: {
          ...item,
          remaining: item.remaining - items[item.id].quantity
        }
      },
      total: total + (item.price * items[item.id].quantity),
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

  editQuantity = item => {
    const { cart, items, removeQuantity } = this.state

    if (removeQuantity > cart.quantity[item.id]) {
      this.setState(prevState => ({
        items: {
          ...items,
          [item.id]: {
            ...item,
            remaining: prevState.items[item.id].remaining - Math.abs(prevState.cart.quantity[item.id] - removeQuantity)
          }
        }
      }))
    } else {
      this.setState(prevState => ({
        items: {
          ...items,
          [item.id]: {
            ...item,
            remaining: prevState.items[item.id].remaining + Math.abs(prevState.cart.quantity[item.id] - removeQuantity)
          }
        }
      }))
    }

    this.setState({
      cart: {
        ...cart,
        quantity: {
          ...cart.quantity,
          [item.id]: parseInt(removeQuantity, 10)
        }
      },
      total: items[item.id].price * removeQuantity
    })
  }

  handleChange = (e, item) => {
    const { items } = this.state

    let value = parseInt(e.target.value, 10)

    this.setState(prevState => ({
      items: {
        ...items,
        [item.id]: {
          ...item,
          quantity: value 
        }
      }
    }))
  }

  render() {
    const { items, cart, total,  } = this.state
  
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
              <div>
                <p>Remaining: {item.remaining}</p>
                <input 
                  type="number"
                  value={ item.quantity }
                  onChange={e => this.handleChange(e, item)}
                  placeholder="quantity"
                  min={1}
                  max={5}
                />
                <button onClick={() => this.addItem(item)}>Add To Cart</button>
              </div>
            )}
          </div>
        ))}

        <hr style={{ 'margin': '100px' }} />

        <h1>Cart</h1>

        {cart.ids.length !== 0 ? Object.keys(items).map(id => (
          <div key={id}>
            {cart.quantity[id] > 0 && (
              <div>
                <h1>{items[id].name}</h1>
                <p>Quantity: 
                  <input 
                    type="number"
                    defaultValue={cart.quantity[id]}
                    min="1"
                    max="5"
                    onChange={e => this.setState({ removeQuantity: parseInt(e.target.value, 10) })}
                    onBlur={() => this.editQuantity(items[id])}
                  />
                </p>
                <p>Price ${items[id].price * cart.quantity[id]}</p>
                <button onClick={e => this.removeItem(items[id])}>Remove From Cart</button>
              </div>
            )}
          </div>
        )) : <h1>No Items In Your Cart</h1>}
        
        { total > 0 && <h1>Total Price: ${total}</h1> }
      </div>
    )
  }
}