import React, { Component } from 'react'
import { connect } from 'react-redux'
import EncounterForm from './EncounterForm'
import EncountersTable from './EncountersTable'

class Encounters extends Component {
  render() {
    return (
      <div>
        <h1> Encounters </h1>
        <EncounterForm/>
        <EncountersTable/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    encounters: state.encounters.list,
  }
}

export default connect(mapStateToProps)(Encounters);
