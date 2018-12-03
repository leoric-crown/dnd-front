const characterReducer = (state = {
  list: [],
  selectedCharacter: undefined
}, action) => {
  switch (action.type) {
    case 'GET_ALL_CHARACTERS':
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
