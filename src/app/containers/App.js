import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setTesting } from '../actions/templateActions'

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello: {this.props.testing}
        <br/>
        <button className="btn btn-primary" onClick={() => this.props.setTesting(1)}>
        Set Testing
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    testing: state.template.testing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTesting: (testing) => {
      dispatch(setTesting(testing))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
