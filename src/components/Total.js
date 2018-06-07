import React, { Component } from 'react'
import { connect } from 'react-redux'

class Total extends Component {
  render() {
    const { total } = this.props.items

    return (
      total > 0 ? (
        <h3>Total: ${total}</h3>
      ) : (
        null
      )
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items }
}

export default connect(mapStateToProps)(Total)