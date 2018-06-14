import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderItems } from '../actions/itemActions'
import { addItem } from '../actions/cartActions'
import Navbar from './Navbar'
import '../css/itemStyling.css'
import '../css/singleItemStyling.css'

class ViewItem extends Component {
  state = {
    itemQuantity: 0,
  }
  
  componentDidMount = () => {
    this.props.renderItems()
  }
  
  // componentWillUnmount = () => {
  //   this.setState({
  //     quantityRemainingErrorMessage: false,
  //     invalidQuantityMessage: false,
  //     successMessage: false
  //   })
  // }
  
  onChange = e => {
    this.setState({
      itemQuantity: parseInt(e.target.value, 10)
    })
  }

  addItem = item => {
    const { itemQuantity } = this.state

    if (itemQuantity > item.remaining) {
      this.setState({
        quantityRemainingErrorMessage: true
      })
    }

    if (itemQuantity === isNaN || itemQuantity === 0 || itemQuantity < 0) {
      this.setState({
        invalidQuantityMessage: true
      })
    }

    if (itemQuantity > 0 && itemQuantity <= item.remaining && itemQuantity !== isNaN && itemQuantity !== 0) {
      this.props.addItem(item, itemQuantity)
      
      this.setState({
        successMessage: true
      })
    }
  }

  render() {
    const { item } = this.props
    const { quantityRemainingErrorMessage, successMessage, invalidQuantityMessage } = this.state

    // if (quantityRemainingErrorMessage || successMessage || invalidQuantityMessage) {
    //   setTimeout(() => {
    //     this.setState({
    //       quantityRemainingErrorMessage: false,
    //       invalidQuantityMessage: false,
    //       successMessage: false
    //     })
    //   }, 2000)
    // }

    return (
      <div>
        <Navbar />
        {item ? (
          <div className="single-item-container">
            <div className="single-item-image">
              <img src={item.image} alt="shoes" />
            </div>
            <div className="single-item-info">
              <div className="single-item-info-child">
                <h2>{item.name}</h2>
                <h5>Price: ${item.price}</h5>
                {/* <h5>Remaining: {item.remaining}</h5> */}
                <input 
                  type="number"
                  min={1}
                  max={5}
                  onChange={e => this.onChange(e)}  
                  placeholder="quantity"
                  className="center"
                />
                <button 
                  className="center"
                  onClick={() => this.addItem(item)}>
                  Add To Cart
                </button>
              </div>
            </div>
            { quantityRemainingErrorMessage ? <h5 style={{ 'color': 'red' }}>Not enough in stock</h5> : null }
            { invalidQuantityMessage ? <h5 style={{ 'color': 'red' }}>Please add a valid quantity</h5> : null }
            { successMessage ? <h5 style={{ 'color': 'green' }}>Successfully added</h5> : null }
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ items }, props) => {
    return items.items !== null ? (
      { item: Object.values(items.items)
              .map(item => item)
              .find(item => item.id === parseInt(props.match.params.id, 10))
      }
    ) : (
      { item: null }
    )
}

export default connect(mapStateToProps, { addItem, renderItems })(ViewItem)