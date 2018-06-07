const initialState = {
  ids: [],
  quantity: {
    1: 0,
    2: 0,
    3: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        quantity: {
          ...state.quantity,
          [action.payload.id]: state.quantity[action.payload.id] + 1
        }
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
        quantity: {
          ...state.quantity,
          [action.payload.id]: 0
        }
      }

    default: 
      return state
  }
}