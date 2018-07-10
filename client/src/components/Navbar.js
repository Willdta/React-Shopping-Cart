import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../App'
import { signoutUser } from '../actions/authActions'
import '../css/nav.css'

const Navbar = ({ signoutUser }) => {
  return (
    <div className="nav">
      <Link to="/shop" className="home-link">
        <h1>React E-Commerce</h1>
      </Link>
      <Link className="cart-link" to="/cart">
        <i className="fas fa-shopping-cart fa-lg"></i>
      </Link>
      <button className="logout-button auth-button" onClick={() => signoutUser(history)}>Log out</button>
    </div>
  )
}

export default connect(null, { signoutUser })(Navbar)