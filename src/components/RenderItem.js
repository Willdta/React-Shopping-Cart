import React from 'react'

export default ({ item }) => {
  return (
    <div>
      <h5>{item.name}</h5>
      <h5>${item.price}</h5>
      {item.remaining === 0 ? (
        <h5>Sold Out</h5>
      ) : (
        <h5>Remaining: {item.remaining}</h5>
      )}
    </div>
  )
}