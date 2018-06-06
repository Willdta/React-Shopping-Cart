import React, { Component } from 'react'
import { connect } from 'react-redux'
import RenderItem from './RenderItem'

class RenderItems extends Component {
  render() {
    const { items } = this.props

    return (
      <div>
        {Object.values(items).map(item => (
          <RenderItem item={item} key={item.id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items }
}

export default connect(mapStateToProps)(RenderItems)