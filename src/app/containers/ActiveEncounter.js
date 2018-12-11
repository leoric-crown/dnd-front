import React, { Component } from 'react'
import { connect } from 'react-redux'
import InitiativeForm from '../components/InitiativeForm'
import TurnTracker from '../components/TurnTracker'

class Initiatives extends Component {
  render() {
    if(this.props.encounters.length === 0) {
      return (<div>Loading</div>)
    } else {
      const { activeEncounter, activeInitiative } = this.props
      if(!activeEncounter) return (
        <div>
          No Active Encounters! Go to 'Encounters' to begin an Encounter
        </div>
      )
      return (
        <div>
          <InitiativeForm encounter={activeEncounter}/>
          <TurnTracker activeEncounter={activeEncounter} activeInitiative={activeInitiative}/>
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    encounters: state.encounters.list,
    activeEncounter: state.encounters.activeEncounter,
    activeInitiative: state.initiatives.activeInitiative,
    initiatives: state.initiatives.list,
  }
}

export default connect(mapStateToProps)(Initiatives);
