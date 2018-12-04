const encounterReducer = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_ENCOUNTERS':
    case 'ADD_ENCOUNTER':
    case 'REMOVE_ENCOUNTER':
    case 'PATCH_ENCOUNTER':
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
