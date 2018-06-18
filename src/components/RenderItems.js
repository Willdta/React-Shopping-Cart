import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import RenderItem from './RenderItem'
import Navbar from './Navbar'
import '../css/itemStyling.css'

class RenderItems extends Component {
  state = {
    searchTerm: ''
  }
  
  componentDidMount = () => {
    this.props.renderItems()
  }
  
  render() {
    const { items } = this.props
    const { searchTerm } = this.state
        
    return (
      items !== null ? (
        <div>
          <Navbar />
          <input
            className="search-input"
            type="text" 
            placeholder="Search" 
            onChange={e => this.setState({ searchTerm: e.target.value })} 
          />
          <div className="items-container">
            {Object.values(items).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
              <RenderItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="loader">Loading...</h1>
      )
    )
  }
}

const mapStateToProps = ({ items }) => ({
  items: items.items
})

export default connect(mapStateToProps, { renderItems })(RenderItems)