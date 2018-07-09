import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTotal } from '../actions/itemActions'
import { sendMail } from '../actions/cartActions'

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

    this.props.sendMail(message)
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.sendEmail(e)}>
          <input 
            type="text" 
            placeholder="name" 
            name="name"
            onChange={e => this.onChange(e)} 
            />
          <input 
            type="text" 
            placeholder="email" 
            name="email" 
            onChange={e => this.onChange(e)} 
          />
          <input 
            type="submit" 
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({
  total: cart.total
})

export default connect(mapStateToProps, { renderTotal, sendMail })(Checkout)