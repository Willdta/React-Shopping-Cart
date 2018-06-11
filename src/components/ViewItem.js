import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import { addItem } from '../actions/cartActions'
import { Link } from 'react-router-dom'

class ViewItem extends Component {
  state = {
    itemQuantity: 0,
    quantityRemainingErrorMessage: false,
    invalidQuantityMessage: false,
    successMessage: false
  }

  componentWillMount = () => {
    this.props.renderItems()
  }
  

  onChange = e => {
    this.setState({
      itemQuantity: parseInt(e.target.value, 10)
    })
  }

  addItem = item => {
    const { itemQuantity } = this.state

    if (itemQuantity > item.remaining) {
      this.setState({
        quantityRemainingErrorMessage: true
      })
    }

    if (itemQuantity === isNaN || itemQuantity === 0 || itemQuantity < 0) {
      this.setState({
        invalidQuantityMessage: true
      })
    }

    if (itemQuantity > 0 && itemQuantity <= item.remaining && itemQuantity !== isNaN && itemQuantity !== 0) {
      this.props.addItem(item, itemQuantity)
      
      this.setState({
        successMessage: true
      })
    }
  }

  render() {
    const { item } = this.props
    const { quantityRemainingErrorMessage, successMessage, invalidQuantityMessage } = this.state

    if (quantityRemainingErrorMessage || successMessage || invalidQuantityMessage) {
      setTimeout(() => {
        this.setState({
          quantityRemainingErrorMessage: false,
          invalidQuantityMessage: false,
          successMessage: false
        })
      }, 2000)
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <Link to="/cart">View Cart</Link>
        {item ? (
          <div>
            <img src={item.image} alt="shoes" />
            <h2>{item.name}</h2>
            <h5>$ {item.price}</h5>
            <h5>Remaining: {item.remaining}</h5>
            <input 
              type="number"
              min={1}
              max={5}
              onChange={e => this.onChange(e)}  
              placeholder="quantity"
            />
            <button onClick={() => this.addItem(item)}>Add To Cart</button>
            { quantityRemainingErrorMessage ? <h5 style={{ 'color': 'red' }}>Not enough in stock</h5> : null }
            { invalidQuantityMessage ? <h5 style={{ 'color': 'red' }}>Please add a valid quantity</h5> : null }
            { successMessage ? <h5 style={{ 'color': 'green' }}>Successfully added</h5> : null }
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ items }, props) => {
  if (items.stuff) {
    return {
      item: Object.values(items.stuff)
            .map(item => item)
            .find(item => item.id === parseInt(props.match.params.id, 10))
    }
  }
}

export default connect(mapStateToProps, { addItem, renderItems })(ViewItem)