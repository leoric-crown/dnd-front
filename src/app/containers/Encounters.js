import React, { Component } from 'react'
import { connect } from 'react-redux'
import EncounterForm from '../components/EncounterForm'
import EncountersTable from '../components/EncountersTable'

class Encounters extends Component {
  render() {
    return (
      <div>
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
