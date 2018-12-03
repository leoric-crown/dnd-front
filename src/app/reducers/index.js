import { combineReducers } from 'redux'
import template from './templateReducer'
import characters from './characterReducer'
import encounters from './encounterReducer'
import conditions from './conditionReducer'

export default combineReducers({
  template,
  characters,
  encounters,
  conditions
})
