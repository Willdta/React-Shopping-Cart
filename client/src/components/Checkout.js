import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTotal } from '../actions/itemActions'
import { sendMail, toggleErrorMessage } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import { phoneReg, emailReg, addressReg, postalReg } from '../regex'
import Navbar from './Navbar'
import SelectOptions from './SelectOptions'

class Checkout extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    errorMessage: false
  }

  componentDidMount() {
    this.props.renderTotal()
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeAlert = () => {
    this.setState({
      errorMessage: false
    })
  }

  sendEmail = e => {
    e.preventDefault()
    
    const { name, phone, email, address, city, province, postalCode } = this.state
    const { total, history } = this.props
    const message = { name, email, address, city, province, postalCode, total }

    if (name !== '' && phone.match(phoneReg) && email.match(emailReg) && address.match(addressReg) && city.length >= 4 && city.length >= 4 && postalCode.match(postalReg)) {
      this.props.sendMail(message, history)
    } else {
      this.setState({ errorMessage: true })
    }
  }

  render() {
    const { name, phone, email, address, city, province, postalCode, errorMessage } = this.state
    const { emailFailed } = this.props

    return (
      <div>
        <Navbar />
        <h2 className="payment-text">Enter Your Payment Info</h2>
        <p className="disclaimer-text">*Canadian Residents Only*</p>
        <p className="email-confirmation-text">You will receive an email confirmation validating your order.</p>
        <Link className="preview-cart-link" to="/cart">Check Order</Link>

        <form className="checkout-form" onSubmit={e => this.sendEmail(e)}>
          <input 
            type="text" 
            placeholder="name"
            className="checkout-button-style"
            value={name}
            name="name"
            onChange={e => this.onChange(e)}
          />
          <input 
            type="text" 
            placeholder="phone"
            className="checkout-button-style"
            value={phone}
            name="phone"
            onChange={e => this.onChange(e)}
          />
          <input 
            type="text" 
            placeholder="email" 
            className="checkout-button-style"
            value={email}
            name="email" 
            onChange={e => this.onChange(e)} 
          />
          <input 
            type="text" 
            placeholder="address"
            className="checkout-button-style"
            value={address}
            name="address"
            onChange={e => this.onChange(e)}
          />
          <input 
            type="text" 
            placeholder="city"
            className="checkout-button-style"
            value={city}
            name="city"
            onChange={e => this.onChange(e)}
          />
          <SelectOptions 
            name="province" 
            value={province} 
            onChange={e => this.onChange(e)}
          />
          <input 
            type="text" 
            placeholder="postal code"
            className="checkout-button-style"
            value={postalCode}
            name="postalCode"
            onChange={e => this.onChange(e)}
          />
          <button type="submit" className="checkout-button-style">Submit Order</button>
        </form>

         { emailFailed && <h5 onClick={() => this.props.toggleErrorMessage()} className="error-message message">Email Failed to Send</h5> }
         { errorMessage ? <h5 onClick={() => this.removeAlert()} className="error-message message">Invalid Credentials</h5> : null }
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({
  total: cart.total,
  emailFailed: cart.emailFailed
})

export default connect(mapStateToProps, { renderTotal, sendMail, toggleErrorMessage })(Checkout)