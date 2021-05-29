import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import product from './product'
import ui from './ui'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ui', 'product'],
}

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
  })

const rootReducer = createRootReducer()

export default persistReducer(persistConfig, rootReducer)
