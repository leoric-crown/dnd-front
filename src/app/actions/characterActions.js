import { fetchAllCharacters, postCharacter, patchByUrl, deleteByUrl } from '../util/api'

export function getCharacters (dispatch) {
  return dispatch => {
    fetchAllCharacters()
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

export function addCharacter (body) {
  return dispatch => {
    postCharacter(body)
    .then(fetchAllCharacters)
    .then(data => {
      dispatch({
        type:'ADD_CHARACTER',
        payload: {
          characters: data.characters
        }
      })
    })
  }
}

export function updateCharacter (body) {
  return dispatch => {
    patchByUrl(body)
    .then(fetchAllCharacters)
    .then(data => {
      dispatch({
        type: 'PATCH_CHARACTER',
        payload: {
          characters: data.characters
        }
      })
    })
  }
}

export function removeCharacter (url, dispatch) {
  return dispatch => {
    deleteByUrl(url)
    .then(fetchAllCharacters)
    .then(data => {
      dispatch({
        type: 'REMOVE_CHARACTER',
        payload: {
          characters: data.characters
        }
      })
    })
  }
}
