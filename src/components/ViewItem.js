import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/cartActions'
import { Link } from 'react-router-dom'

class ViewItem extends Component {
  state = {
    itemQuantity: 0
  }

  onChange = e => {
    this.setState({
      itemQuantity: parseInt(e.target.value, 10)
    })
  }

  addItem = item => {
    const { itemQuantity } = this.state

    if (itemQuantity > 0 && itemQuantity <= item.remaining && itemQuantity !== isNaN && itemQuantity !== 0) {
      this.props.addItem(item, itemQuantity)
    }
  }

  render() {
    const { item } = this.props

    return (
      <div>
        <Link to="/">Back</Link>
        <Link to="/cart">View Cart</Link>
        {item && (
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
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ items }, props) => ({
  item: Object.values(items.items)
        .map(item => item)
        .find(item => item.id === parseInt(props.match.params.id, 10))
})

export default connect(mapStateToProps, { addItem })(ViewItem)