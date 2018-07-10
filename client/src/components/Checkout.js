import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTotal } from '../actions/itemActions'
import { sendMail, toggleMessage } from '../actions/cartActions'
import { emailReg, phoneReg } from '../regex'
import Navbar from './Navbar'

class Checkout extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    errorMessage: false
  }

  componentDidMount = () => {
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
    
    const { name, phone, email } = this.state
    const { total } = this.props
    const message = { name, email, total }

    if (name !== '' && email.match(emailReg) && phone.match(phoneReg)) {
      this.props.sendMail(message)
    }

    if (name === '' || !email.match(emailReg) || !phone.match(phoneReg)) {
      this.setState({ errorMessage: true })
    }
  }

  render() {
    const { name, phone, email, errorMessage } = this.state
    const { total, emailSent } = this.props

    return (
      <div>
        <Navbar />
        { total ? <h2 className="total">Your total is ${total}</h2> : <h2 className="total">Loading</h2> }
        <p>You will receive an email confirmation validating your order.</p>

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
         <button type="submit" className="checkout-button-style">Submit Order</button>
        </form>

         { emailSent && <h5 onClick={() => this.props.toggleMessage()} className="success-message message">Thanks for ordering!</h5> }
         { errorMessage ? <h5 onClick={() => this.removeAlert()} className="error-message message">Your name, phone or email is invalid</h5> : null }
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({
  total: cart.total,
  emailSent: cart.emailSent
})

export default connect(mapStateToProps, { renderTotal, sendMail, toggleMessage })(Checkout)