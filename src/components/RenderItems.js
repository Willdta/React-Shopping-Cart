import React, { Component } from 'react'
import { connect } from 'react-redux'
import RenderItem from './RenderItem'
import { renderItems } from '../actions/itemActions'
import { addItem } from '../actions/cartActions'

class RenderItems extends Component {
  componentDidMount = () => {
    this.props.renderItems()
  }
  
  render() {
    const { items } = this.props

    return (
      items && Object.values(items).map(item => (
        <div key={item.id}>
          <h5>{item.name}</h5>
          <h5>${item.price}</h5>
          <h5>Remaining: {item.remaining}</h5>
          <button onClick={() => this.props.addItem(item)}>Add To Cart</button>
        </div>
      ))
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items }
}

export default connect(mapStateToProps, { renderItems, addItem })(RenderItems)