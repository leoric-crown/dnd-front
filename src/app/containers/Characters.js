import React, { Component } from 'react'
import { connect } from 'react-redux'
import CharacterForm from '../components/CharacterForm'
import CharactersTable from '../components/CharactersTable'

class Characters extends Component {
  render() {
    return (
      <div>
        <CharacterForm/>
        <CharactersTable/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    characters: state.characters.list,
  }
}

export default connect(mapStateToProps)(Characters);
