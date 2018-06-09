import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import { Link } from 'react-router-dom'
import RenderItem from './RenderItem'

class RenderItems extends Component {
  componentDidMount = () => {
    this.props.renderItems()
  }
  
  render() {
    const { items } = this.props
    
    return (
      items && (
        <div>
          <h1>Shopping Area</h1>
          <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
            {Object.values(items).map(item => (
              <RenderItem item={item} key={item.id} />
            ))}
          </div>
          <Link to="/cart">View Cart</Link>
        </div>
      )
    )
  }
}

const mapStateToProps = ({ items }) => ({
  items: items.items
})

export default connect(mapStateToProps, { renderItems })(RenderItems)