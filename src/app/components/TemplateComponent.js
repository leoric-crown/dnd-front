import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTesting } from '../actions/templateActions'

class TemplateComponent extends Component {
  render() {
    return (
      <div>
        Hello: {this.props.testing}
        <br/>
        <button className="btn btn-primary" onClick={() => this.props.setTesting(1)}>
        Set Testing
        </button>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
