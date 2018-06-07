export const renderCart = () => ({
  type: 'RENDER_CART'
})

export const addItem = (item, value) => {    
  const payload = {
    id: item.id,
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