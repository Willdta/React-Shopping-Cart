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
      <div>
        <Navbar />
        <h1 style={{ 'marginTop': '80px' }}>Cart</h1>
        {total > 0 && (
          <h3>Total: ${ total }</h3>
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
          <h5>No Items in your cart</h5>
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