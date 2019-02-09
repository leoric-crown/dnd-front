import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import { addEncounter } from '../actions/encounterActions'
import { getSelect } from '../util/components'

const ENCOUNTER_NAME = 'name'
const STATUS = 'status'
export const getStatusOptions = () => {
  return [
    <option key='Preparing' value='Preparing'>Preparing</option>,
    <option key='Concluded' value='Concluded'>Concluded</option>
  ]
}


class EncounterForm extends Component {
  state = {
    name: '',
    status: 'Preparing'
  }
  constructor(props) {
    super(props)
    this.firstInput = React.createRef()
  }

  handleInput = (value, key) => {
    switch(key) {
      case ENCOUNTER_NAME:
        this.setState({name: value})
        break
      case STATUS:
        this.setState({status: value})
        break
      default:
        break
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const body = JSON.stringify({
      name: this.state.name,
      status: this.state.status
    })
    this.props.dispatch(addEncounter(body))
    this.setState({
      name: '',
      status: 'Preparing'
    })
    this.firstInput.current.focus()
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <h3>Encounter Form</h3>
        <form onSubmit = {this.handleSubmit}>
          <div className='container'>
            <input type = 'text'
              ref = {this.firstInput}
              placeholder = 'Encounter Name'
              value = {name}
              onChange = {event => {this.handleInput(event.target.value, ENCOUNTER_NAME)}}
              className = 'row'
            />
            {getSelect({
              propName: STATUS,
              value: this.state.status,
              options: getStatusOptions(),
              inline: false
            }, {
              input: this.handleInput
              }
            )}
            <button type = 'submit' className = 'row'>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}


export default connect()(EncounterForm)
