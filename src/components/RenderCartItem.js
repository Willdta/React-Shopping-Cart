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
    const { id } = item
    const { value } = e.target
    
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
    } else if (value > cart.quantity[id]) {
      this.props.incrementCartQuantity(item, parseInt(value, 10))
    } else if (value < cart.quantity[id]) {
      this.props.decrementCartQuantity(item, parseInt(value, 10))
    }
  }

  render() {
    const { items, id } = this.props
    const { invalidQuantityMessage, quantityErrorMessage } = this.state

    if (invalidQuantityMessage || quantityErrorMessage) {
      setTimeout(() => {
        this.setState({
          invalidQuantityMessage: false,
          quantityErrorMessage: false
        })
      }, 1000)
    }

    return (
      items[id].quantity > 0 && (
        <div>
          <div key={id} className="item-container">
            <img src={items[id].image} alt="shoes" />
            <h4>{items[id].name}</h4>
            <h5>Total Item Price: ${items[id].price * items[id].quantity}</h5>
            <div className="input-container">
              <input 
                type="number"
                min={1}
                max={5}
                key={items[id].quantity}
                defaultValue={items[id].quantity}
                onBlur={e => this.editCartQuantity(items[id], e)}
                ref={value => this.value = value}
              />
            </div>
            <h5>Quantity: {items[id].quantity}</h5>
            <button className="remove-button button" onClick={() => this.props.removeItem(items[id])}>Remove</button>
            <button className="edit-button button" onClick={() => this.value.focus()}>Edit</button>
          </div>

          { quantityErrorMessage ? <h5 className="error-message">Not enough in stock</h5> : null }
          { invalidQuantityMessage ? <h5 className="error-message">Please add a valid quantity</h5> : null }
          {/* { successMessage ? <h5 className="success-message">Successfully added</h5> : null } */}

        </div>
      )
    )
  }
}

export default connect(null, { removeItem, incrementCartQuantity, decrementCartQuantity })(RenderCartItem)