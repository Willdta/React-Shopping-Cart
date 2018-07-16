import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ThankYou = () => (
  <div>
    <Navbar />
    <div className="thank-you">
      <p>Thank you for shopping with us!</p>
      <p>You will receive an email confirmation shortly.</p>
      <Link to="/shop">
        <button className="checkout-button-style continue">Continue Shopping</button>
      </Link>
    </div>
  </div>
)

export default ThankYou