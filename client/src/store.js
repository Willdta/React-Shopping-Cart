import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

const middleware = applyMiddleware(thunk)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose

const store = createStore(reducer, {}, composeEnhancers(middleware))

export default store