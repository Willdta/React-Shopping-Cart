import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, addQuantity } from '../actions/cartActions'
import { renderCart } from '../actions/itemActions'
import Navbar from './Navbar'
import '../css/itemStyling.css'
import '../css/singleItemStyling.css'

class ViewItem extends Component {
  state = {
    itemQuantity: 0,
    quantityErrorMessage: false,
    successMessage: false,
    invalidQuantityMessage: false
  }
  
  componentDidMount = () => {
    this.props.renderCart()
  }
  
  onChange = e => {
    this.setState({
      itemQuantity: parseInt(e.target.value, 10)
    })
  }

  addItem = item => {
    const { itemQuantity } = this.state
    const { cart } = this.props
    const i = cart.findIndex(x => x.id === item.id)

    if (itemQuantity > item.remaining) {
      this.setState({
        quantityErrorMessage: true
      })
    }

    if (itemQuantity === isNaN || itemQuantity === 0 || itemQuantity < 0) {
      this.setState({
        invalidQuantityMessage: true
      })
    }

    if (!cart.some(x => x.id === item.id) && itemQuantity > 0 && itemQuantity <= item.remaining && itemQuantity !== isNaN && itemQuantity !== 0) {
      this.props.addItem(item, itemQuantity)
      
      this.setState({
        successMessage: true
      })
    }

    if (cart.some(x => x.id === item.id)) {
      this.props.addQuantity(i, itemQuantity, cart[i]) 
    }
  }

  increment = () => {
    this.setState({
      itemQuantity: this.state.itemQuantity + 1
    })
  }

  decrement = () => {
    this.setState({
      itemQuantity: this.state.itemQuantity - 1
    })
  }

  render() {
    const { item } = this.props
    const { quantityErrorMessage, successMessage, invalidQuantityMessage, itemQuantity } = this.state

    const filteredItem = item.map(item => item).find(item => item.id === parseInt(this.props.match.params.id, 10))

    // if (quantityErrorMessage || successMessage || invalidQuantityMessage) {
    //   setTimeout(() => {
    //     this.setState({
    //       quantityErrorMessage: false,
    //       invalidQuantityMessage: false,
    //       successMessage: false
    //     })
    //   }, 2000)
    // }

    return (
      <div>
        <Navbar />
        {filteredItem ? (
          <div className="single-item-container">
            <div className="single-item-image">
              <img src={filteredItem.image} alt="shoes" />
            </div>
            <div className="single-item-info">
              <div className="single-item-info-child">
                <h2>{filteredItem.name}</h2>
                <h3>Price: ${filteredItem.price}</h3>
                <h4>{filteredItem.description}</h4>
                <div className="input-container">
                  <div className="plus quantity-button" onClick={() => this.increment()}>+</div>
                  <input 
                    type="number"
                    min={1}
                    max={5}
                    onChange={ e => this.onChange(e) }
                    value={ itemQuantity }  
                    placeholder="quantity"
                  />
                  <div className="minus quantity-button" onClick={() => this.decrement()}>-</div>
                </div>
                <button 
                  className="center"
                  onClick={() => this.addItem(filteredItem)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="loader">Loading...</h1>
        )}
        { quantityErrorMessage ? <h5 className="error-message message">Not enough in stock</h5> : null }
        { invalidQuantityMessage ? <h5 className="error-message message">Please add a valid quantity</h5> : null }
        { successMessage ? <h5 className="success-message message">Successfully added</h5> : null }
      </div>
    )
  }
}

const mapStateToProps = ({ items, cart }, props) => {
    // return items.items !== null ? (
    //   { item: items.items
    //           .map(item => item)
    //           .find(item => item.id === parseInt(props.match.params.id, 10))
    //   }) : (
    //   { item: null }
    // )
    return {
      cart: cart.cart,
      item: items.items
    }
}

export default connect(mapStateToProps, { renderCart, addItem, addQuantity })(ViewItem)