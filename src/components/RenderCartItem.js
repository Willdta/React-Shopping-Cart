import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeItem, decrementCartQuantity, incrementCartQuantity } from '../actions/cartActions'

class RenderCartItem extends Component {
  state = {
    cartQuantity: 0
  }

  editCartQuantity = (item, e) => {
    const { cart } = this.props
    const { id } = item
    const { value } = e.target

    if (parseInt(value, 10) === 0 || value === '' || value < 0 || value > item.initialStock) {
      e.preventDefault()
    } else if (value > cart.quantity[id]) {
      this.props.incrementCartQuantity(item, parseInt(value, 10))
    } else if (value < cart.quantity[id]) {
      this.props.decrementCartQuantity(item, parseInt(value, 10))
    }
  }

  // increment = () => {
  //  this.setState({
  //   cartQuantity: this.state.cartQuantity + 1
  //  })
  // }

  // decrement = () => {
  //  this.setState({
  //   cartQuantity: this.state.cartQuantity - 1
  //  })
  // }

  render() {
    const { items, id } = this.props

    return (
      items[id].quantity > 0 && (
        <div key={id} className="item-container">
          <img src={items[id].image} alt="shoes" />
          <h4>{items[id].name}</h4>
          <h5>Total Item Price: ${items[id].price * items[id].quantity}</h5>
          <div className="input-container">
            <div className="plus" onClick={() => this.increment()}>+</div>
            <input 
              type="number"
              min={1}
              max={5}
              key={items[id].quantity}
              defaultValue={items[id].quantity}
              onBlur={e => this.editCartQuantity(items[id], e)}
              // onChange={e => this.editCartQuantity(items[id], e)}
              // ref={value => this.value = value}
            />
            <div className="minus">-</div>
          </div>
          <h5>Quantity: {items[id].quantity}</h5>
          <button onClick={() => this.props.removeItem(items[id])}>Remove</button>
        </div>
      )
    )
  }
}

export default connect(null, { removeItem, incrementCartQuantity, decrementCartQuantity })(RenderCartItem)