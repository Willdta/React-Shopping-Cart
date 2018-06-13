import React, { Component } from 'react'
import '../css/itemStyling.css'
import { Link } from 'react-router-dom'

export default class RenderItem extends Component {  
  render() {
    const { item } = this.props

    return (
      <div key={item.id} className="item-container">
        <Link to={`/item/${item.id}`}>
          <img src={item.image} alt="iamge" style={{ 'height': '200px', 'width': '200px' }}/>
        </Link>
        <h4>{item.name}</h4>
        <h5>${item.price}</h5>
        {item.remaining === 0 ? (
          <h5 style={{'color': 'red'}}>Sold Out</h5>
        ) : (
          null
        )}
      </div>
    )
  }
}