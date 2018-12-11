const initiativeReducer = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_INITIATIVES':
    case 'ADD_INITIATIVE':
    case 'PATCH_INITIATIVE':
    case 'REMOVE_INITIATIVE':
    case 'SET_ACTIVE_INITIATIVE':
    const { initiatives } = action.payload
      state = {
        ...state,
        list: action.payload.initiatives,
        activeInitiative: (initiatives.find(i => i.active === true) ?
                      initiatives.find(i => i.active === true) :
                      null)
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default initiativeReducer
