import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  removeItem, 
  decrementCartQuantity, 
  incrementCartQuantity, 
} from '../actions/cartActions'

class RenderCartItem extends Component {
  state = {
    invalidQuantityMessage: false
  }

  removeAlert = () => {
    this.setState({
      invalidQuantityMessage: false
    })
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
    }  else if (value > item.quantity) {
      this.props.incrementCartQuantity(item, i, parseInt(value, 10))
    } else if (value < item.quantity) {
      this.props.decrementCartQuantity(item, i, parseInt(value, 10))
    }
  }

  render() {
    const { item } = this.props
    const { invalidQuantityMessage } = this.state

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
          <button className="remove-button button" onClick={() => this.props.removeItem(item)}>Remove</button>
          <button className="edit-button button" onClick={() => this.value.focus()}>Edit</button>
        </div>

        { invalidQuantityMessage && <h5 onClick={() => this.removeAlert()} className="error-message message">Please add a valid quantity</h5> }
      </div>
    )
  }
}

export default connect(null, { removeItem, incrementCartQuantity, decrementCartQuantity })(RenderCartItem)