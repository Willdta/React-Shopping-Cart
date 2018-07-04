import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  removeItem, 
  decrementCartQuantity, 
  incrementCartQuantity, 
} from '../actions/cartActions'

class RenderCartItem extends Component {
  state = {
    invalidQuantityMessage: false,
    successMessage: false,
    quantityErrorMessage: false
  }

  editCartQuantity = (item, e) => {
    const { cart } = this.props
    const { value } = e.target
    const i = cart.findIndex(x => x.id === item.id)    

    if (parseInt(value, 10) === 0 || value === '' || value < 0) {
      e.preventDefault()
      this.setState({
        invalidQuantityMessage: true,
      })
    } else if (parseInt(value, 10) > item.initialStock) {
      e.preventDefault()
      this.setState({
        quantityErrorMessage: true,
      })
    } else if (value > item.quantity) {
      this.props.incrementCartQuantity(item, i, parseInt(value, 10))
    } else if (value < item.quantity) {
      this.props.decrementCartQuantity(item, i, parseInt(value, 10))
    }
  }

  render() {
    const { item, index } = this.props
    const { invalidQuantityMessage, quantityErrorMessage } = this.state

    console.log(this.props.cart);
    

    if (invalidQuantityMessage || quantityErrorMessage) {
      setTimeout(() => {
        this.setState({
          invalidQuantityMessage: false,
          quantityErrorMessage: false
        })
      }, 1000)
    }

    return (
      <div>
        <div key={item.id} className="item-container">
          <img src={item.image} alt="shoes" />
          <h4>{item.name}</h4>
          <h5>Total Item Price: ${item.price * item.quantity}</h5>
          <div className="input-container">
            <input 
              type="number"
              min={1}
              max={5}
              key={item.quantity}
              defaultValue={item.quantity}
              onBlur={e => this.editCartQuantity(item, e)}
              ref={value => this.value = value}
            />
          </div>
          <h5>Quantity: {item.quantity}</h5>
          <button className="remove-button button" onClick={() => this.props.removeItem(item, index)}>Remove</button>
          <button className="edit-button button" onClick={() => this.value.focus()}>Edit</button>
        </div>

        { quantityErrorMessage ? <h5 className="error-message message">Not enough in stock</h5> : null }
        { invalidQuantityMessage ? <h5 className="error-message message">Please add a valid quantity</h5> : null }
      </div>
    )
  }
}

export default connect(null, { removeItem, incrementCartQuantity, decrementCartQuantity })(RenderCartItem)