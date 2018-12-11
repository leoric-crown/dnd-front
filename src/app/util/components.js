import React from 'react'

export const getSelectOptions = (propName) => {
  switch (propName) {
    case 'level':
      const levels = Array.from(Array(21).keys())
      return levels.map(level => {
        if(level === 0) return (
          <option key={0} value='Level' disabled> Level </option>
        )
        return (
          <option key={level} value={level}>{level}</option>
        )
      })
    case 'status':
      return [
        <option key='Preparing' value='Preparing'>Preparing</option>,
        <option key='Active' value='Active'>Active</option>,
        <option key='Concluded' value='Concluded'>Concluded</option>
      ]
    default:
  }
}

export const getSelect = (payload, handlers) => {
  return (
    <div>
      <select
        id={payload.propName}
        value={payload.value}
        onChange={event => {handlers.input(event.target.value, payload.propName)}}>
        {payload.options}
      </select>
      {(payload.inline ? <button className="confirm" onClick ={() => handlers.submit()}/> : <div/>)}
      {(payload.inline ? <button className="cancel" onClick={() => handlers.resetEditableCell()}/> : <div/>)}
    </div>
  )
}

export const getDeleteButton = (row, handleDelete) => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleDelete(row.original)
      }>
      Delete
      </button>
    </div>
  )
}

export const getEditableTextField = (value, handlers) => {
  return (
    <div className = 'container'>
      <input type = 'text'
        autoFocus
        value = {value}
        onChange = {event => {handlers.input(event.target.value)}}
        onKeyUp = {event => {handlers.keyUp(event.key)}}
        className = 'row editableField'
      />
      <button className="cancel" onClick={() => handlers.resetEditableCell()}/>
    </div>
  )
}

export const getEditableButton = (payload, handleClick) => {
  return (
    <div className="verticalCenter">
      <button className="btn btn-primary plainButton" onClick={() => handleClick(payload)}>
      {payload.displayValue}
      </button>
    </div>
  )
}

export const getEditableCheckBox = (payload, handleInput) => {
  return (
    <input type = 'checkbox' checked = {payload.value} onChange = {event => {handleInput(event.target.checked, payload.prop)}}/>
  )
}
