import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import { addEncounter } from '../actions/encounterActions'

const CHARACTER_NAME = 'name'
const LEVEL = 'level'
const ARMOR_CLASS = 'armorclass'
const HIT_POINTS = 'hitpoints'
const MAX_HIT_POINTS = 'maxhitpoints'
const CONDITION = 'condition'
const PLAYER = 'player'

class CharacterForm extends Component {
  state = {
    name: '',
    level: '',
    armorclass: '',
    hitpoints: '',
    maxhitpoints: '',
    condition: '',
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
      case HIT_POINTS:
        this.setState({hitpoints: value})
        break
      case MAX_HIT_POINTS:
        this.setState({maxhitpoints: value})
        break
      case CONDITION:
        this.setState({condition: value})
        break
      case PLAYER:
        this.setState({player: value})
        break
      default:
        break
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const body = JSON.stringify(this.state)
    //this.props.dispatch(addEncounter(body))
    this.setState({
      name: '',
      level: '',
      armorclass: '',
      hitpoints: '',
      maxhitpoints: '',
      condition: '',
      player: false
    })
    this.firstInput.current.focus()
  }

  render() {
    const { name, level, armorclass, hitpoints, maxhitpoints, condition, player } = this.state
    console.log(this.state)
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
            <input type = 'text'
              placeholder = 'Level'
              value = {level}
              onChange = {event => {this.handleInput(event.target.value, LEVEL)}}
            />
            <input type = 'text'
              placeholder = 'Armor Class'
              value = {armorclass}
              onChange = {event => {this.handleInput(event.target.value, ARMOR_CLASS)}}
            />
            <input type = 'text'
              placeholder = 'HP'
              value = {hitpoints}
              onChange = {event => {this.handleInput(event.target.value, HIT_POINTS)}}
            />
            <input type = 'text'
              placeholder = 'Max HP'
              value = {maxhitpoints}
              onChange = {event => {this.handleInput(event.target.value, MAX_HIT_POINTS)}}
            />
            <input type = 'select'

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


export default connect()(CharacterForm);
