import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/cartActions'

class RenderItem extends Component {
  state = {
    itemQuantity: 0
  }

  onChange = e => {
    this.setState({
      itemQuantity: parseInt(e.target.value, 10)
    })
  }
  
  render() {
    const { item } = this.props
    const { itemQuantity } = this.state

    return (
      <div key={item.id}>
        <h5>{item.name}</h5>
        <h5>${item.price}</h5>
        <h5>Remaining: {item.remaining}</h5>
        <input 
          type="number"
          min={1}
          max={5}
          onChange={e => this.onChange(e)}  
          placeholder="quantity"
        />
        <button onClick={() => this.props.addItem(item, itemQuantity)}>Add To Cart</button>
      </div>
    )
  }
}

export default connect(null, { addItem })(RenderItem)