import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class RenderItem extends Component {  
  render() {
    const { item } = this.props

    return (
      <div key={item.id}>
        <img src={item.image} alt="iamge" style={{ 'height': '200px', 'width': '200px' }}/>
        <h5>{item.name}</h5>
        <h5>${item.price}</h5>
        <h5>Remaining: {item.remaining}</h5>
        <Link to={`/item/${item.id}`}>View Item</Link>
      </div>
    )
  }
}