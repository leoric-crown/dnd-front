import { fetchCollection, postDocument, patchByUrl, deleteByUrl } from '../util/api'

const INITIATIVES = 'initiatives'
const fetchAllInitiatives = () => {
  return fetchCollection(INITIATIVES)
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
  return dispatch => {
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
