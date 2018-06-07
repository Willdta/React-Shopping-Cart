import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import { addItem } from '../actions/cartActions'

class RenderItems extends Component {
  state = {
    itemQuantity: 0
  }

  componentDidMount = () => {
    this.props.renderItems()
  }
  
  render() {
    const { items } = this.props
    const { itemQuantity } = this.state
    
    console.log(itemQuantity);
    

    return (
      items && Object.values(items).map(item => (
        <div key={item.id}>
          <h5>{item.name}</h5>
          <h5>${item.price}</h5>
          <h5>Remaining: {item.remaining}</h5>
          <input 
            type="number"
            onChange={e => this.setState({ itemQuantity: parseInt(e.target.value, 10)})}  
            placeholder="quantity"
          />
          <button onClick={() => this.props.addItem(item, itemQuantity)}>Add To Cart</button>
        </div>
      ))
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items: items.items }
}

export default connect(mapStateToProps, { renderItems, addItem })(RenderItems)