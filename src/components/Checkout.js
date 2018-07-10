import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTotal } from '../actions/itemActions'
import { sendMail, toggleMessage } from '../actions/cartActions'
import Navbar from './Navbar'

class Checkout extends Component {
  state = {
    name: '',
    email: ''
  }

  componentDidMount = () => {
    this.props.renderTotal()
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendEmail = e => {
    e.preventDefault()
    
    const { name, email } = this.state
    const { total } = this.props
    const message = { name, email, total }
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (name !== '' && email.match(regex)) {
      this.props.sendMail(message)
    }
  }

  render() {
    const { name, email } = this.state
    const { total, emailSent } = this.props

    return (
      <div>
        <Navbar />
        { total ? <h2>Your total is ${total}</h2> : <h2>Loading</h2> }

        <form onSubmit={e => this.sendEmail(e)}>
          <input 
            type="text" 
            placeholder="name"
            value={name}
            name="name"
            onChange={e => this.onChange(e)}
            />
          <input 
            type="text" 
            placeholder="email" 
            value={email}
            name="email" 
            onChange={e => this.onChange(e)} 
          />
          <input 
            type="submit" 
          />
        </form>

         {emailSent && <h5 onClick={() => this.props.toggleMessage()}className="success-message message">Thanks for ordering!</h5>}
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({
  total: cart.total,
  emailSent: cart.emailSent
})

export default connect(mapStateToProps, { renderTotal, sendMail, toggleMessage })(Checkout)