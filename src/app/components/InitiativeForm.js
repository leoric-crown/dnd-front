import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import { addInitiative } from '../actions/initiativeActions'

const ENCOUNTER = 'encounter'
const CHARACTER = 'character'
const INITIATIVE = 'initiative'

class InitiativeForm extends Component {
  state = {
    initiative: '',
    encounter: 'Choose Encounter',
    character: 'Choose Character',
  }
  constructor(props) {
    super(props)
    this.firstInput = React.createRef()
  }

  handleInput = (value, key) => {
    switch(key) {
      case INITIATIVE:
        this.setState({initiative: value})
        break
      case ENCOUNTER:
        this.setState({encounter: value})
        break
      case CHARACTER:
        this.setState({character: value})
        break
      default:
        break
    }
  }

  getSelectOptions = () => {
    const { encounters, characters } = this.props

    const encounterOptions = encounters.map(encounter => {
       return (
         <option key={encounter._id} value={encounter._id}>{encounter.name}</option>
       )
    })
    encounterOptions.unshift(<option key='e0' value='Choose Encounter' disabled> Choose Encounter </option>)
    const characterOptions = characters.map(character => {
      return (
         <option key={character._id} value={character._id}>{character.name}</option>
      )
    })
    characterOptions.unshift(<option key='c0' value='Choose Character' disabled> Choose Character </option>)

    return{
      encounters: encounterOptions,
      characters: characterOptions
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const body = JSON.stringify(this.state)
    this.props.dispatch(addInitiative(body))
    this.setState({
      initiative: '',
      character: 'Choose Character'
    })
    this.firstInput.current.focus()
  }

  render() {
    return (
      <div>
      <h3>Initiative Form</h3>
      <form onSubmit = {this.handleSubmit}>
        <div>
        <select
          id='encounter'
          value={this.state.encounter}
          onChange={event => {this.handleInput(event.target.value, ENCOUNTER)}}>
          {this.getSelectOptions().encounters}
        </select>
        <select
          id='character'
          value={this.state.character}
          onChange={event => {this.handleInput(event.target.value, CHARACTER)}}>
          {this.getSelectOptions().characters}
        </select>
          <input type = 'text'
            ref = {this.firstInput}
            placeholder = 'Initiative Roll'
            value = {this.state.initiative}
            onChange = {event => {this.handleInput(event.target.value, INITIATIVE)}}
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

const mapStateToProps = (state) => {
  return {
    encounters: state.encounters.list,
    characters: state.characters.list,
    initiatives: state.initiatives.list,
  }
}

export default connect(mapStateToProps)(InitiativeForm)
