import {createStore} from "redux"
import middleware from './middleware'
import reducer from './reducers'

export default createStore(
  reducer,
  {}, //initial state
  middleware
)
