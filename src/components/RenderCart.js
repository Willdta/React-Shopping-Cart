import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderCartItem from './RenderCartItem'

class RenderCart extends Component {
  renderCart = () => {
    const { cart, items, total } = this.props
    
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>Cart</h1>
        {cart.ids.length !== 0 ? (
          <div>
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

        {total > 0 && (
          <h3>Total: ${total}</h3>
        )}
      </div>
    )
  }
  
  render() { return this.renderCart() }
}

const mapStateToProps = ({ cart, items }) => ({
  cart, 
  items: items.items, 
  total: items.total
})

export default connect(mapStateToProps)(RenderCart)