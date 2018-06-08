import { RENDER_ITEMS, VIEW_ITEM } from './types'

export const renderItems = () => ({
  type: RENDER_ITEMS
})

export const viewItem = item => ({
  type: VIEW_ITEM,
  payload: item
})