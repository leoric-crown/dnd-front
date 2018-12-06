import React, { Component } from 'react'
import { connect } from 'react-redux'

import InitiativeForm from '../components/InitiativeForm'
import InitiativesTable from '../components/InitiativesTable'

class Initiatives extends Component {
  render() {
    return (
      <div>
        <InitiativeForm
        />
        <InitiativesTable/>
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

export default connect(mapStateToProps)(Initiatives);
