import {
  RENDER_ITEMS,
  RENDER_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY
} from '../actions/types'

const initialState = {
  items: [
    {
      id: 1,
      description: "Sweet shoes produced by the G.O.A.T Kanye West....",
      image: 'https://www.yeezys.club/image/cache/catalog/TB2ErI.dohnpuFjSZFPXXb_4XXa_!!2914266524-400x400.jpg',
      name: 'Yeezys',
      price: 100,
      quantity: 0,
      remaining: 5
    },
    {
      id: 2,
      description: 'This sweater will unlock super Github abilities. It will also make you look super fresh.',
      image: 'https://cdn.shopify.com/s/files/1/0262/3477/products/product-image-457055122.jpg?v=1510010749',
      name: 'Github Sweater',
      price: 50,
      quantity: 0,
      remaining: 5
    }
  ],
  // cart: [],
  // total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case RENDER_ITEMS:
    //   return { ...state, items: action.payload }
    
    case RENDER_CART:
      return { ...state, cart: action.payload }
    
    case 'RENDER_TOTAL':
      return { ...state, total: action.payload }

    // case ADD_TO_CART:
      // return { 
      //   ...state,
      //   items: {
      //     ...state.items, 
      //     [action.payload.id]: {
      //       ...state.items[action.payload.id],
      //       remaining: state.items[action.payload.id].remaining - action.payload.value,
      //       quantity: state.items[action.payload.id].quantity + action.payload.value
      //     }
      //   },
      //   total: state.total + (state.items[action.payload.id].price * action.payload.value)
      // }

      // return {
      //   ...state,
      //   cart: [...state.cart, { ...action.payload.item, quantity: action.payload.value}],
      //   total: state.total + (action.payload.price * action.payload.value)
      // }

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