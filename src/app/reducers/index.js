import { combineReducers } from 'redux'
import characters from './characterReducer'
import encounters from './encounterReducer'
import conditions from './conditionReducer'
import initiatives from './initiativeReducer'

export default combineReducers({
  characters,
  conditions,
  encounters,
  initiatives
})
