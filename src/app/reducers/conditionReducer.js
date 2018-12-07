const conditionReducer = (state = {
  list: [],
  resetEditableCell: false
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
/*
editableCell:
    displayValue: "Charmed"
    editableProp:
          characterProp: true
          name: "conditions"
          type: "conditionsSelect"
    id: "5c08c58c6727fc72f8f82be1"
    originalValue: "Charmed"
    player: false
    url: "http://localhost:5000/initiatives/5c08c58c6727fc72f8f82be1/character"
    value: "Charmed"

*/
export default conditionReducer
