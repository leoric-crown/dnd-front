import logger from 'redux-logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default applyMiddleware (
  thunk,
  logger
)
