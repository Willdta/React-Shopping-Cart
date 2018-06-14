import React from 'react'
import { Link } from 'react-router-dom'
import '../css/nav.css'

export default () => {
  return (
    <div className="nav">
      <Link to="/" className="home-link">
        <h1>React E-Commerce</h1>
      </Link>
      <Link className="cart-link" to="/cart">
        <i className="fas fa-shopping-cart fa-lg"></i>
      </Link>
    </div>
  )
}
