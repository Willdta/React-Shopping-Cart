export const renderCart = () => ({
  type: 'RENDER_CART'
})

export const addItem = ({ id }, value) => {    
  const payload = {
    id,
    value
  }
  
  return {
    type: 'ADD_TO_CART',
    payload
  }
}

export const removeItem = (item, id) => ({
  type: 'REMOVE_FROM_CART',
  payload: item
})

export const incrementCartQuantity = ({ id }, value) => {
  const payload = {
    id,
    value
  }

  return {
    type: 'INCREMENT_CART_QUANTITY',
    payload
  }
}

export const decrementCartQuantity = ({ id }, value) => {
  const payload = {
    id,
    value
  }

  return {
    type: 'DECREMENT_CART_QUANTITY',
    payload
  }
}