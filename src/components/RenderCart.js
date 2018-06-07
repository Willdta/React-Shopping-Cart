import React, { Component } from 'react'
import { connect } from 'react-redux'

class RenderCart extends Component {
  render() {
    const { items, cart } = this.props

    return (
      cart.ids.length !== 0 ? (
        Object.keys(items).map(id => (
          <div>
            {cart.quantity[id] > 0 && (
              <div>
                <h5>{items[id].name}</h5>
                <h5>Total Item Price: ${items[id].price * cart.quantity[id]}</h5>
              </div>
            )
            }
          </div>
        ) )
      ) : (
        <h5>No Items in your cart</h5>
      )
    )
  }
}

const mapStateToProps = ({ cart, items }) => {
  return { cart, items }
}

export default connect(mapStateToProps)(RenderCart)