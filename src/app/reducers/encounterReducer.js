const encounterReducer = (state = {
  list: [],
  activeEncounter: null
}, action) => {
  switch (action.type) {
    case 'GET_ALL_ENCOUNTERS':
    case 'ADD_ENCOUNTER':
    case 'REMOVE_ENCOUNTER':
    case 'PATCH_ENCOUNTER':
    case 'SET_ACTIVE_ENCOUNTER':
      const { encounters } = action.payload
      state = {
        ...state,
        list: action.payload.encounters,
        activeEncounter: (encounters.find(e => e.status === 'Active') ?
                encounters.find(e => e.status === 'Active') :
                null)
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default encounterReducer
