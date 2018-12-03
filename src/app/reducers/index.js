import { combineReducers } from 'redux'
import template from './templateReducer'
import characters from './characterReducer'

export default combineReducers({
  template,
  characters
})
