import { fetchCollection, postDocument, patchByUrl, deleteByUrl } from '../util/api'

const INITIATIVES = 'initiatives'
const CHARACTERS = 'characters'
const fetchAllInitiatives = () => {
  return fetchCollection(INITIATIVES)
}
const fetchAllCharacters = () => {
  return fetchCollection(CHARACTERS)
}

export function getInitiatives (dispatch) {
  return dispatch => {
    fetchCollection(INITIATIVES)
    .then(data => {
      dispatch({
        type: 'GET_ALL_INITIATIVES',
        payload: {
          initiatives: data.initiatives
        }
      })
    })
  }
}

export function addInitiative (body) {
  return dispatch => {
    postDocument(INITIATIVES, body)
    .then(() => {
      fetchCollection(INITIATIVES)
      .then(data => {
        dispatch({
          type:'ADD_INITIATIVE',
          payload: {
            initiatives: data.initiatives
          }
        })
      })
    })
  }
}

export function updateInitiative (body) {
  console.log('updateinitiative)')
  console.log(body)
  return dispatch => {
    if(!body.player) {
      patchByUrl(body)
      .then(fetchAllInitiatives)
      .then(data => {
        dispatch({
          type: 'PATCH_INITIATIVE',
          payload: {
            initiatives: data.initiatives
          }
        })
      })
    }
    else {
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
}

export function removeInitiative (url, dispatch) {
  return dispatch => {
    deleteByUrl(url)
    .then(fetchAllInitiatives)
    .then(data => {
      dispatch({
        type: 'REMOVE_INITIATIVE',
        payload: {
          initiatives: data.initiatives
        }
      })
    })
  }
}
