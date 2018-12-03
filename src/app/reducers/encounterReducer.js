const encounterReducer = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_ENCOUNTERS':
      state = {
        ...state,
        list: action.payload.encounters
      }
      break
    case 'GET_ENCOUNTER':
      state = {
        ...state,
        encounter: action.payload.encounter
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default encounterReducer
