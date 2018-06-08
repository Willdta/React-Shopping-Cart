import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  removeItem, 
  incrementCartQuantity, 
  decrementCartQuantity 
} from '../actions/cartActions'
import { Link } from 'react-router-dom'

class RenderCart extends Component {
  editCartQuantity = (item, e) => {
    const { cart } = this.props
    const { id } = item

    if (e.target.value > cart.quantity[id]) {
      this.props.incrementCartQuantity(item, parseInt(e.target.value, 10))
    } else {
      this.props.decrementCartQuantity(item, parseInt(e.target.value, 10))
    }
  }

  renderCart = () => {
    const { cart, items, total } = this.props
    
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>Cart</h1>
        {cart.ids.length !== 0 ? (
          Object.keys(items).map(id => (
            cart.quantity[id] > 0 && (
              <div key={id}>
                <h5>{items[id].name}</h5>
                <h5>Total Item Price: ${items[id].price * cart.quantity[id]}</h5>
                <input 
                  type="number"
                  min={1}
                  max={5}
                  key={cart.quantity[id]}
                  defaultValue={cart.quantity[id]}
                  onBlur={e => this.editCartQuantity(items[id], e)}
                />
                <h5>Quantity: {cart.quantity[id]}</h5>
                <button onClick={() => this.props.removeItem(items[id])}>Remove From Cart</button>
              </div>
            )
          ))
        ) : (
          <h5>No Items in your cart</h5>
        )}

        {total > 0 && (
          <h3>Total: ${total}</h3>
        )}
      </div>
    )
  }
  
  render() { return this.renderCart() }
}

const mapStateToProps = ({ cart, items }) => {
  return { cart, items: items.items, total: items.total }
}

export default connect(mapStateToProps, 
{ removeItem, 
  incrementCartQuantity, 
  decrementCartQuantity 
})(RenderCart)