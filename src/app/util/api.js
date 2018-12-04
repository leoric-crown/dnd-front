import config from '../../config/main'

export const fetchAllEncounters = () => {
  return fetch(`${config.apiPath}/encounters`, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
}

export const fetchEncounter = (url) => {
  return fetch(url, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
}

export const postEncounter = (body) => {
  return fetch(`${config.apiPath}/encounters`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body
  })
}

export const patchEncounter = (data) => {
  const body = [{
    propName: data.editableProp,
    value: data.value
  }]
  return fetch(`${config.apiPath}/encounters/${data.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

export const deleteEncounter = (url) => {
  return fetch(url, {
    method: 'DELETE',
    header: {'Content-Type': 'application/json'}
  })
}
