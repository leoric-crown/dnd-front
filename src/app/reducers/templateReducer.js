const templateReducer = (state = {
  testing: 0,
}, action) => {
  switch (action.type) {
    case "SET_TESTING":
      state = {
        ...state,
        testing: action.payload.testing
      }
      break
    default:
      state = { ...state }
  }
  return state
}
export default templateReducer
