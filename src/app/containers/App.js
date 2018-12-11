import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from '../components/Nav'
import Encounters from './Encounters'
import ActiveEncounter from './ActiveEncounter'
import Characters from './Characters'
import Initiatives from './Initiatives'
import { getCharacters } from '../actions/characterActions'
import { getEncounters } from '../actions/encounterActions'
import { getConditions } from '../actions/conditionActions'
import { getInitiatives } from '../actions/initiativeActions'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(getCharacters())
    this.props.dispatch(getEncounters())
    this.props.dispatch(getConditions())
    this.props.dispatch(getInitiatives())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <div>
              <Nav/>
              <Switch>
                <Route exact path='/encounters' component={Encounters}/>
                <Route exact path='/encounters/active' component={ActiveEncounter}/>
                <Route exact path='/characters' component={Characters}/>
                <Route exact path='/initiatives' component={Initiatives}/>
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters.list,
    //encounters: state.encounters.list
  }
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    getCharacters: () => {
      dispatch(getCharacters())
    }
  }
}*/


export default connect(mapStateToProps)(App);
