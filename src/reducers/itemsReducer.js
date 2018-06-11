import {
  RENDER_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from '../actions/types'

const initialState = {
  // items: {
  //   1: {
  //     id: 1,
  //     name: 'Yeezys',
  //     image: 'https://www.sneakermake.com/wp-content/uploads/2017/05/NEW-2017-UA-Adidas-Yeezy-350-V2-Boost-SPLV-Bape-Shark-2-400x400.jpg',
  //     price: 100,
  //     category: 'Shoes',
  //     remaining: 5,
  //     initialStock: 5,
  //     quantity: 0
  //   },
  
  //   2: {
  //     id: 2,
  //     name: 'Github Sweater',
  //     image: 'https://cdn.shopify.com/s/files/1/0262/3477/products/product-image-457055122.jpg?v=1510010749',
  //     price: 50,
  //     category: 'Clothes',
  //     remaining: 5,
  //     initialStock: 5,
  //     quantity: 0
  //   },
  
  //  3: {
  //     id: 3,
  //     name: 'Protein Powder',
  //     image: 'https://cdn.hoppingo.com/products/163472/medium/inlife-whey-protein-powder-2-lbs--chocolate-flavour--body-building-supplement----------------------------------------------2lb-.jpg',
  //     price: 200,
  //     category: 'Gym',
  //     remaining: 5,
  //     initialStock: 5,      
  //     quantity: 0
  //   },

  //  4: {
  //     id: 4,
  //     name: 'Boosts',
  //     image: 'https://images.footlocker.com/pi/BB6179/large/adidas-ultra-boost-mens',
  //     price: 300,
  //     category: 'Shoes',
  //     remaining: 5,
  //     initialStock: 5,      
  //     quantity: 0
  //   }
  // },
  // total: 0,
  stuff: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RENDER_ITEMS:
      console.log(action.payload)
      return { ...state, stuff: action.payload }

    case ADD_TO_CART:
      return { 
        ...state,
        items: {
          ...state.items, 
          [action.payload.item.id]: {
            ...state.items[action.payload.item.id],
            remaining: state.items[action.payload.item.id].remaining - action.payload.value,
            quantity: state.items[action.payload.item.id].quantity + action.payload.value
          }
        },
        total: state.total + (state.items[action.payload.item.id].price * action.payload.value)
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            ...state.items[action.payload],
            remaining: 5,
            quantity: 0
          }
        },
        total: state.total - (state.items[action.payload].price * state.items[action.payload].quantity)
      }

    case INCREMENT_CART_QUANTITY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining - Math.abs(state.items[action.payload.id].quantity - action.payload.value),
            quantity: action.payload.value
          }
        },
        total: state.total + state.items[action.payload.id].price * Math.abs(state.items[action.payload.id].quantity - action.payload.value)
      }
      
    case DECREMENT_CART_QUANTITY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining + Math.abs(state.items[action.payload.id].quantity - action.payload.value),
            quantity: action.payload.value
          }
        },
        total: state.total - state.items[action.payload.id].price * Math.abs(state.items[action.payload.id].quantity - action.payload.value)
      }

    default:
      return state
  }
}