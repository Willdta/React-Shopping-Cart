import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderCart, renderTotal } from '../actions/itemActions'
import RenderCartItem from './RenderCartItem'
import Navbar from './Navbar'

class RenderCart extends Component {
  componentDidMount = () => {
    this.props.renderCart()
    this.props.renderTotal()
  }
  
  renderCart = () => {
    const { cart, total } = this.props

    return (
      <div className="cart-container">
        <Navbar />
        <h1 style={{ 'marginTop': '80px' }}>Cart</h1>
        {total > 0 && (
          <h3 className="cart-text">Total: ${ total }</h3>
        )}
        {cart.length > 0 ? (
          <div className="items-container">
            {cart.map(item => (
              <RenderCartItem 
                key={item.id} 
                item={item}
                cart={cart}
                index={item.key}
              />
            ))}
          </div>
        ) : (
          <h3>No Items in your cart</h3>
        )}
      </div>
    )
  }
  
  render() { return this.renderCart() }
}

const mapStateToProps = ({ cart }) => ({
  total: cart.total,
  cart: cart.cart
})

export default connect(mapStateToProps, { renderCart, renderTotal })(RenderCart)