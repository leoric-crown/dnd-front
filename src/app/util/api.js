import config from '../../config/main'

export const fetchCollection = (collection) => {
  console.log(`${config.apiPath}`)
  return fetch(`${config.apiPath}/${collection}`, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
}

export const fetchAllInitiatives = () => {
  return fetch(`${config.apiPath}/initiatives`, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
}

export const postDocument = (collection, body) => {
  return fetch(`${config.apiPath}/${collection}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body
  })
}

export const fetchAllEncounters = () => {
  return fetch(`${config.apiPath}/encounters`, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
}

export const fetchEncounter = url => {
  return fetch(url, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
}

export const postEncounter = body => {
  return fetch(`${config.apiPath}/encounters`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body
  })
}

export const fetchAllCharacters = () => {
  return fetch(`${config.apiPath}/characters`, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
}

export const postCharacter = body => {
  return fetch(`${config.apiPath}/characters`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body
  })
}

export const fetchByUrl = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
}

export const patchByUrl = data => {
  const body = [{
    propName: data.editableProp.name,
    value: data.value
  }]
  return fetch(data.url, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

export const deleteByUrl = url => {
  return fetch(url, {
    method: 'DELETE',
    header: {'Content-Type': 'application/json'}
  })
}
