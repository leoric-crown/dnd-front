const initiativeReducer = (state = {
  list: []
}, action) => {
  console.log(action.payload)
  switch (action.type) {
    case 'GET_ALL_INITIATIVES':
    case 'ADD_INITIATIVE':
    case 'PATCH_INITIATIVE':
    case 'REMOVE_INITIATIVE':
      state = {
        ...state,
        list: action.payload.initiatives
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default initiativeReducer
