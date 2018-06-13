import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems, renderCart, renderTotal } from '../actions/itemActions'
import { Link } from 'react-router-dom'
import RenderCartItem from './RenderCartItem'

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
        <Link to="/">Back</Link>
        <h1>Cart</h1>
        {items && total > 0 ? (
          <div>
            {Object.keys(items).map(id => (
              <RenderCartItem 
                key={id} 
                cart={cart} 
                items={items} 
                id={id} 
              />
            ))}
          <h3>Total: ${total}</h3>
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