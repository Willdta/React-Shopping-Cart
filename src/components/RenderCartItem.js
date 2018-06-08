import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeItem, decrementCartQuantity, incrementCartQuantity } from '../actions/cartActions'

class RenderCartItem extends Component {
  editCartQuantity = (item, e) => {
    const { cart } = this.props
    const { id } = item
    const { value } = e.target

    if (parseInt(value, 10) === 0 || value === '' || value > item.initialStock) {
      e.preventDefault()
    } else if (value > cart.quantity[id]) {
      this.props.incrementCartQuantity(item, parseInt(value, 10))
    } else  {
      this.props.decrementCartQuantity(item, parseInt(value, 10))
    }
  }

  render() {
    const { cart, items, id } = this.props

    return (
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
    )
  }
}

export default connect(null, { removeItem, incrementCartQuantity, decrementCartQuantity })(RenderCartItem)