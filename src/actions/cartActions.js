export const renderCart = () => ({
  type: 'RENDER_CART'
})

export const addItem = (item, id) => ({
  type: 'ADD_TO_CART',
  payload: {
    ...item,
    remaining: item.remaining - 1
  }
})