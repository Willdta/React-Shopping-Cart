export const renderCart = () => ({
  type: 'RENDER_CART'
})

export const addItem = (item, id) => ({
  type: 'ADD_TO_CART',
  payload: item
})

export const removeItem = (item, id) => ({
  type: 'REMOVE_FROM_CART',
  payload: item
})