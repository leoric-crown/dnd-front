const characterReducer = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_CHARACTERS':
    case 'ADD_CHARACTER':
    case 'PATCH_CHARACTER':
    case 'REMOVE_CHARACTER':
      state = {
        ...state,
        list: action.payload.characters
      }
      break
    case 'GET_CHARACTER':
      state = {
        ...state,
        character: action.payload.character
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default characterReducer
