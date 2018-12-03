export function getConditions (dispatch) {
  return dispatch => {
    fetch('http://localhost:5000/conditions', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_ALL_CONDITIONS',
        payload: {
          conditions: data.conditions
        }
      })
    })
  }
}

export function getCondition (dispatch, url) {
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_CONDITION',
        payload: {
          condition: data
        }
      })
    })
  }
}
