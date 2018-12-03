export function getEncounters (dispatch) {
  return dispatch => {
    fetch('http://localhost:5000/encounters', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_ALL_ENCOUNTERS',
        payload: {
          encounters: data.encounters
        }
      })
    })
  }
}

export function getEncounter (dispatch, url) {
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_ENCOUNTER',
        payload: {
          encounter: data
        }
      })
    })
  }
}

export function deleteEncounter(url, dispatch) {
  return (dispatch) => {
    if(url) {
      fetch(url, {
        method: 'DELETE',
        header: {'Content-Type': 'application/json'}
      })
      .then(
        fetch('http://localhost:5000/encounters', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'GET_ALL_ENCOUNTERS',
            payload: {
              encounters: data.encounters
            }
          })
        })
      )
    }
  }
}
