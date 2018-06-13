import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import RenderItem from './RenderItem'
import Navbar from './Navbar'
import '../css/itemStyling.css'

class RenderItems extends Component {
  state = {
    searchTerm: '',
    value: '',
    category: ''
  }
  
  componentDidMount = () => {
    this.props.renderItems()
  }
  
  render() {
    const { items } = this.props
    const { searchTerm, /*value, /category*/ } = this.state

      // let filteredItems = Object.values(items).filter(item => (
      //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
      // ))

      // if (!category && value === 'priceHigh') {
      //   filteredItems = filteredItems.sort((a, b) => b.price - a.price)
      // }

      // if (!category && value === 'priceLow') {
      //   filteredItems = filteredItems.sort((a, b) => a.price - b.price)
      // }

      // if (category && value === 'priceLow') {
      //   filteredItems = filteredItems.filter(item => item.category.includes(category)).sort((a, b) => a.price - b.price)
      // }

      // if (category && value === 'priceHigh') {
      //   filteredItems = filteredItems.filter(item => item.category.includes(category)).sort((a, b) => b.price - a.price)
      // }

      // if (category === 'Shoes' || category === 'Clothes' || category === 'Gym') {
      //   filteredItems = filteredItems.filter(item => item.category.includes(category))
      // }

      // if (category === 'All' && value === 'priceHigh') {
      //   filteredItems = Object.values(items).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => b.price - a.price)
      // }

      // if (category === 'All' && value === 'priceLow') {
        //   filteredItems = Object.values(items).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => a.price - b.price)
        // }
        
        return (
          items !== null ? (
            <div>
                {/* <input 
                  type="text" 
                  placeholder="Search" 
                  onChange={e => this.setState({ searchTerm: e.target.value })} 
                /> */}
                <Navbar />

          {/* <label>Price</label>
          <select value={value} onChange={e => this.setState({ value: e.target.value })}>
            <option style={{ 'display': 'none' }}/>
            <option value="priceHigh">Price (Highest to Lowest)</option>
            <option value="priceLow">Price (Lowest to Highest)</option>
          </select>

          <label>Category</label>
          <select value={category} onChange={e => this.setState({ category: e.target.value })}>
            <option style={{ 'display': 'none' }}/>
            <option value="All">All</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothes">Clothes</option>
            <option value="Gym">Gym Stuff</option>
          </select> */}

          <div className="items-container">
            {Object.values(items).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
              <RenderItem item={item} key={item.id} />
            ))}
          </div>

        </div>
      ) : (
        <h1>Loading...</h1>
      )
    )
  }
}

const mapStateToProps = ({ items }) => ({
  items: items.items
})

export default connect(mapStateToProps, { renderItems })(RenderItems)