import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import { Link } from 'react-router-dom'

class ViewItem extends Component {
  render() {
    const { item } = this.props

    return (
      <div>
        <Link to="/">Back</Link>
        {item && (
          <div>
            <h2>{item.name}</h2>
            <h5>$ {item.price}</h5>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ items }, props) => {
  return { 
    item: Object.values(items.items)
          .map(item => item)
          .find(item => item.id == props.match.params.id)
  }
}

export default connect(mapStateToProps)(ViewItem)