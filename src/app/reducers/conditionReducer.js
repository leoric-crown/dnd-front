const conditionReducer = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_CONDITIONS':
      state = {
        ...state,
        list: action.payload.conditions
      }
      break
    default:
      state = { ...state }
  }
  return state
}

export default conditionReducer
