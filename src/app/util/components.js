import React from 'react'

export const getDeleteButton = (row, handleDelete) => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleDelete(row.original.request.url)
      }>
      Delete
      </button>
    </div>
  )
}

export const getEditableTextField = (row, value, handlers) => {
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
    <div>
      <div></div>
      <button className="btn btn-primary editableButton" onClick={() => handleClick(payload)}>
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
