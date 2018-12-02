const templateReducer = (state = {
  testing: 0,
}, action) => {
  console.log('IN: templateReducer, state:')
  console.log(state)
  switch (action.type) {
    case "SET_TESTING":
      state = {
        ...state,
        testing: state.testing + action.payload.testing
      }
      break
    default:
      state = { ...state }
  }
  return state
}
export default templateReducer
