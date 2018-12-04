import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import { addEncounter } from '../actions/encounterActions'

const ENCOUNTER_NAME = 'name'
const STATUS = 'status'

class EncounterForm extends Component {
  state = {
    name: '',
    status: ''
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
      status: (this.state.status === '' ? 'Preparing' : this.state.status)
    })
    this.props.dispatch(addEncounter(body))
    this.setState({
      name: '',
      status: ''
    })
    this.firstInput.current.focus()
  }

  render() {
    const { name, status } = this.state
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
            <input type = 'text'
              placeholder = 'Encounter Status'
              value = {status}
              onChange = {event => {this.handleInput(event.target.value, STATUS)}}
              className = 'row'
            />
            <button type = 'submit' className = 'row'>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}


export default connect()(EncounterForm);
