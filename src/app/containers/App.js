import React, { Component, Fragment } from 'react';

import './css/App.css';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TemplateComponent from '../components/TemplateComponent'
import Encounters from '../components/Encounters'
import { getCharacters } from '../actions/characterActions'
import { getEncounters } from '../actions/encounterActions'
import { getConditions } from '../actions/conditionActions'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getCharacters())
    this.props.dispatch(getEncounters())
    this.props.dispatch(getConditions())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <div>
              <Switch>
                <Route exact path='/testing' component={TemplateComponent}/>
                <Route exact path='/encounters' component={Encounters}/>
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
