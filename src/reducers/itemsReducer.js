const initialState = {
  items: {
    1: {
      id: 1,
      name: 'Yeezys',
      price: 50,
      remaining: 5,
      quantity: 1
    },
  
    2: {
      id: 2,
      name: 'Github Sweater',
      price: 100,
      remaining: 5,
      quantity: 1
    },
  
   3: {
      id: 3,
      name: 'Protein Powder',
      price: 200,
      remaining: 5,
      quantity: 1
    }
  },
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RENDER_ITEMS':
      return { ...state }

    case 'ADD_TO_CART':
      return { 
        ...state,
        items: {
          ...state.items, 
          [action.payload.id]: {
            ...state.items[action.payload.id],
            remaining: state.items[action.payload.id].remaining - 1
          }
        },
        total: state.total + state.items[action.payload.id].price
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        [action.payload.id]: {
          ...state.items[action.payload.id],
          remaining: 5
        }
      }

    default:
      return state
  }
}