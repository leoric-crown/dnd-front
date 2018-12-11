import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import { addCharacter } from '../actions/characterActions'
import { getSelectOptions } from '../util/components'

const CHARACTER_NAME = 'name'
const LEVEL = 'level'
const ARMOR_CLASS = 'armorclass'
const MAX_HIT_POINTS = 'maxhitpoints'
const CONDITIONS = 'condition'
const PLAYER = 'player'

class CharacterForm extends Component {
  state = {
    name: '',
    level: 'Level',
    armorclass: '',
    maxhitpoints: '',
    conditions: [],
    player: false
  }
  constructor(props) {
    super(props)
    this.firstInput = React.createRef()
  }

  handleInput = (value, key) => {
    switch(key) {
      case CHARACTER_NAME:
        this.setState({name: value})
        break
      case LEVEL:
        this.setState({level: value})
        break
      case ARMOR_CLASS:
        this.setState({armorclass: value})
        break
      case MAX_HIT_POINTS:
        this.setState({maxhitpoints: value})
        break
      case CONDITIONS:
        this.setState({conditions: value})
        break
      case PLAYER:
      console.log(value)
        this.setState({player: value})
        break
      default:
        break
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const body = JSON.stringify(this.state)
    this.props.dispatch(addCharacter(body))
    this.setState({
      name: '',
      level: 'Level',
      armorclass: '',
      maxhitpoints: '',
      conditions: [],
      player: false
    })
    this.firstInput.current.focus()
  }

  render() {
    const { name, armorclass, maxhitpoints} = this.state
    return (
      <div>
        <h3>Character Form</h3>
        <form onSubmit = {this.handleSubmit}>
          <div>
            <input type = 'text'
              ref = {this.firstInput}
              placeholder = 'Character Name'
              value = {name}
              onChange = {event => {this.handleInput(event.target.value, CHARACTER_NAME)}}
            />
            <select
              id='levelSelect'
              value={this.state.level}
              onChange={event => {this.handleInput(event.target.value, LEVEL)}}>
              {getSelectOptions(LEVEL)}
            </select>
            <input type = 'text'
              placeholder = 'Armor Class'
              value = {armorclass}
              onChange = {event => {this.handleInput(event.target.value, ARMOR_CLASS)}}
            />
            <input type = 'text'
              placeholder = 'Max HP'
              value = {maxhitpoints}
              onChange = {event => {this.handleInput(event.target.value, MAX_HIT_POINTS)}}
            />
            {'  PC  '}?
            <input type = 'checkbox' checked = {this.state.player} className = 'row' onChange = {event => {this.handleInput(event.target.checked, PLAYER)}}/>
            <button type = 'submit' className = 'row'>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect()(CharacterForm);
