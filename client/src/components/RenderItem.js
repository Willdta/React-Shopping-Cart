import React from 'react'
import { Link } from 'react-router-dom'
import '../css/itemStyling.css'

const RenderItem = ({ item }) => (
  <div key={item.id} className="item-container">
    <Link to={`/item/${item.id}`}>
      <img src={item.image} alt="iamge" />
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

export default RenderItem