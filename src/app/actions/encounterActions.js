import { fetchAllEncounters, fetchEncounter, postEncounter, patchEncounter, deleteEncounter } from '../util/api'

export function getEncounters (dispatch) {
  return dispatch => {
    fetchAllEncounters()
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
    fetchEncounter(url)
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

export function addEncounter(body, dispatch) {
  return dispatch => {
    postEncounter(body)
    .then(fetchAllEncounters)
    .then(data => {
      dispatch({
        type: 'ADD_ENCOUNTER',
        payload: {
          encounters: data.encounters
        }
      })
    })
  }
}

export function updateEncounter (body) {
  return dispatch => {
    patchEncounter(body)
    .then(fetchAllEncounters)
    .then(data => {
      dispatch({
        type: 'PATCH_ENCOUNTER',
        payload: {
          encounters: data.encounters
        }
      })
    })
  }
}

export function removeEncounter (url, dispatch) {
  return dispatch => {
    deleteEncounter(url)
    .then(fetchAllEncounters)
    .then(data => {
      dispatch({
        type: 'REMOVE_ENCOUNTER',
        payload: {
          encounters: data.encounters
        }
      })
    })
  }
}
