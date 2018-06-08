import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
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
          {Object.values(items).map(item => (
            <RenderItem item={item} key={item.id} />
          ))}
        </div>
      )
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items: items.items }
}

export default connect(mapStateToProps, { renderItems })(RenderItems)