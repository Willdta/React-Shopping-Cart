import React, { Component } from 'react'
import { connect } from 'react-redux'

class Total extends Component {
  render() {
    const { total } = this.props

    return (
      total > 0 && (
        <h3>Total: ${total}</h3>
      )
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { total: items.total }
}

export default connect(mapStateToProps)(Total)