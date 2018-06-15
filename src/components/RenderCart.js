import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems, renderCart, renderTotal } from '../actions/itemActions'
import RenderCartItem from './RenderCartItem'
import Navbar from './Navbar'

class RenderCart extends Component {
  componentDidMount = () => {
    this.props.renderItems()
    this.props.renderCart()
    this.props.renderTotal()
  }
  
  renderCart = () => {
    const { cart, items, total } = this.props

    return (
      <div className="cart-container">
        <Navbar />
        <h1 style={{ 'marginTop': '80px' }}>Cart</h1>
        {total > 0 && (
          <h3 className="cart-text">Total: ${ total }</h3>
        )}
        {items && total > 0 ? (
          <div className="items-container">
            {Object.keys(items).map(id => (
              <RenderCartItem 
                key={id} 
                cart={cart} 
                items={items} 
                id={id} 
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

const mapStateToProps = ({ items }) => ({
  total: items.total,
  items: items.items,
  cart: items.cart
})

export default connect(mapStateToProps, { renderItems, renderCart, renderTotal })(RenderCart)