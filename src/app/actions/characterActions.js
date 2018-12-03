export function getCharacters (dispatch) {
  return dispatch => {
    fetch('http://localhost:5000/characters', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_ALL_CHARACTERS',
        payload: {
          characters: data.characters
        }
      })
    })
  }
}

export function getCharacter (dispatch, url) {
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_CHARACTER',
        payload: {
          character: data
        }
      })
    })
  }
}
