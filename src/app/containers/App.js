import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TemplateComponent from '../components/TemplateComponent'
import { getCharacters } from '../actions/characterActions'

class App extends Component {
  componentDidMount() {
    console.log('component did mount')
    console.log(this.props)
    this.props.getCharacters()
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <div>
              <Switch>
                <Route exact path='/testing' component={TemplateComponent}/>
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
    character: state.characters.character
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCharacters: () => {
      dispatch(getCharacters())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
