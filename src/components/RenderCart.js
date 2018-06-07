import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeItem, incrementCartQuantity, decrementCartQuantity  } from '../actions/cartActions'

class RenderCart extends Component {
  editCartQuantity = (item, e) => {
    const { items } = this.props

    if (e.target.value > items[item.id].quantity) {
      this.props.incrementCartQuantity(item, e.target.value)
    } else {
      this.props.decrementCartQuantity(item, e.target.value)
    }
  }
  
  render() {
    const { items, cart } = this.props

    return (
      cart.ids.length !== 0 ? (
        Object.keys(items).map(id => (
          cart.quantity[id] > 0 && (
            <div key={id}>
              <hr />
              <h5>{items[id].name}</h5>
              <h5>Total Item Price: ${items[id].price * cart.quantity[id]}</h5>
              <input 
                type="number"
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
      )
    )
  }
}

const mapStateToProps = ({ cart, items }) => {
  return { cart, items: items.items }
}

export default connect(mapStateToProps, { removeItem, incrementCartQuantity, decrementCartQuantity  })(RenderCart)