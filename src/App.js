import React, { Component } from 'react'
import './App.css'
import RenderItems from './components/RenderItems'

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
        id: 1, name: 'Yeezys', price: 50, remaining: 5, quantity: 1
      },  
      
      2: {
        id: 2, name: 'Github Sweater', price: 100, remaining: 5, quantity: 1
      },
      
      3: {
        id: 3, name: 'Protein Powder', price: 200, remaining: 5, quantity: 1
      }
    },

    editQuantity: 0,
    total: 0
  }

  addItem = (item, e) => {
    const { cart, items } = this.state
    const { id, remaining, quantity, price } = item

    if (quantity <= remaining) {
      this.setState(prevState => ({
        cart: {
          ...cart,
          ids: [...prevState.cart.ids, id],
          quantity: {
            ...cart.quantity,
            [id]: prevState.cart.quantity[id] + quantity
          },
        },
        items: {
          ...items,
          [id]: {
            ...item,
            remaining: prevState.items[id].remaining - quantity
          }
        },
        total: prevState.total + (price * quantity)
      }))
    }
  }

  removeItem = item => {
    const { cart, items } = this.state
    const { id, price } = item

    this.setState(prevState => ({
      cart: {
        ...cart,
        ids: cart.ids.filter(id => id !== item.id),
        quantity: {
          ...cart.quantity,
          [id]: 0
        },
      },
      items: {
        ...items,
        [id]: {
          ...item,
          remaining: 5
        }
      },
      total: prevState.total - (price * cart.quantity[id])
    }))
  }
  
  editQuantity = item => {
    const { cart, items, editQuantity } = this.state
    const { price, id } = item

    if (editQuantity > cart.quantity[id]) {
      this.setState(prevState => ({
        items: {
          ...items,
          [id]: {
            ...item,
            remaining: prevState.items[id].remaining - Math.abs(cart.quantity[id] - editQuantity)
          }
        },
        total: prevState.total + price * (Math.abs(cart.quantity[id] - editQuantity))
      }))
    } else {
      this.setState(prevState => ({
        items: {
          ...items,
          [id]: {
            ...item,
            remaining: prevState.items[id].remaining + Math.abs(prevState.cart.quantity[id] - editQuantity)
          }
        },
        total: prevState.total - price * (Math.abs(cart.quantity[id] - editQuantity))
      }))
    }
    
    this.setState({
      cart: {
        ...cart,
        quantity: {
          ...cart.quantity,
          [id]: parseInt(editQuantity, 10)
        }
      }
    })
  }

  handleQuantityChange = (e, item) => {
    const { items } = this.state
    const { id } = item

    const value = parseInt(e.target.value, 10)

    this.setState(prevState => ({
      items: {
        ...items,
        [id]: {
          ...item,
          quantity: value 
        }
      }
    }))
  }

  render() {
    const { items, cart, total } = this.state

    return (
      <div className="App">
        <h1>Shopping Area</h1>
        {/* {Object.values(items).map(item => (
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
                  defaultValue={ item.quantity }
                  onChange={e => this.handleQuantityChange(e, item)}
                  placeholder="quantity"
                  min={1}
                  max={5}
                />
                <button onClick={e => this.addItem(item, e)}>Add To Cart</button>
              </div>
            )}
          </div>
        ))} */}

        <RenderItems />

        <hr style={{ 'margin': '100px' }} />

        <h1>Cart</h1>

        { total > 0 && <h1>Total Price: ${total}</h1> }

        {cart.ids.length !== 0 ? Object.keys(items).map(id => (
          <div key={id}>
            {cart.quantity[id] > 0 && (
              <div>
                <h1>{items[id].name}</h1>
                <p>Quantity: 
                  <input 
                    type="number"
                    defaultValue={cart.quantity[id]}
                    key={cart.quantity[id]}
                    min={1}
                    max={5}
                    onChange={e => this.setState({ editQuantity: parseInt(e.target.value, 10) })}
                    onBlur={() => this.editQuantity(items[id])}
                  />
                </p>
                <p>Price ${items[id].price * cart.quantity[id]}</p>
                <p>Quantity: {cart.quantity[id]}</p>
                <button onClick={e => this.removeItem(items[id])}>Remove From Cart</button>
              </div>
            )}
          </div>
        )) : <h1>No Items In Your Cart</h1>}
      </div>
    )
  }
}