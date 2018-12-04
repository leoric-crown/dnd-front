import React, { Component } from 'react'
import { connect } from 'react-redux'
import CharacterForm from '../components/CharacterForm'
// import EncountersTable from '../components/EncountersTable'

class Characters extends Component {
  render() {
    return (
      <div>
        <CharacterForm/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    encounters: state.encounters.list,
  }
}

export default connect(mapStateToProps)(Characters);
