import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateInitiative } from '../actions/initiativeActions'
import Picky from 'react-picky'
import 'react-picky/dist/picky.css';

class ConditionsSelect extends Component {
  // getValues = () => {
  //   const { characters, conditions } = this.props
  //   const doc = this.props.row.original.characterStamp
  //   var character = doc
  //   if(doc.player) {
  //     character = characters.find(c => c._id === doc._id)
  //   }
  //   const charConditions = character.conditions.map( conditionId => conditions.find(c => c._id === conditionId)).map(c => {
  //     return {
  //       name: c.name,
  //       id: c._id
  //     }
  //   })
  //   this.setState({
  //     originalValues: charConditions,
  //     values: charConditions
  //   })
  // }

  state = {
    originalValues: null,
    values: null,
    editing: false
  }



  handleClick = () => {
    this.setState({
      editing: true
    })
  }

  handleCancel = () => {
    this.setState({
      editing: false,
      values: this.state.originalValues
    })
  }

  handleClear = () => {
    const initiative  = this.props.row.original
    const body = {
        url: initiative.characterStamp.request.url,
        editableProp: {name:"conditions"},
        value: [],
        player: initiative.characterStamp.player
    }
    this.props.dispatch(updateInitiative(body))

    this.setState({
      editing: false,
      values: null,
      originalValues: null
    })
  }

  handleConfirm = () => {
    const { originalValues, values } = this.state
    const original = !originalValues ? '' : originalValues.sort((a,b) => {
      if(a.name < b.name) return -1
      else if (a.name > b.name) return 1
      else return 0
    }).map(c => c.name)
    .join(', ')

    const newValues = !values ? '' : values.sort((a,b) => {
      if(a.name < b.name) return -1
      else if (a.name > b.name) return 1
      else return 0
    }).map(c => c.name)
    .join(', ')

    if(original === newValues) this.handleCancel()
    else {
      const initiative = this.props.row.original
      const body = {
          url: initiative.characterStamp.request.url,
          editableProp: {name:"conditions"},
          value: values.map(c => c.id),
          player: initiative.characterStamp.player
      }

      this.props.dispatch(updateInitiative(body))
      this.setState({
          originalValues: values,
          values: values,
          editing: false
        })

    }
  }
  getMultiSelect = () => {
    return (
      <div className='multiSelectRow'>
      <Picky
        options={this.props.options}
        value={this.state.values}
        valueKey="id"
        labelKey="name"
        multiple={true}
        includeSelectAll={false}
        includeFilter={true}
        onChange={values => this.setState({values})}
        dropdownHeight={150}
      />
        <br/>
          <button className="confirm" onClick ={this.handleConfirm}/>
          <button className="cancel" onClick={this.handleCancel}/>
          <br/>
          <div className="container">
            <button onClick={this.handleClear}>
              Clear All
            </button>
          </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if(!this.props.values) {
      this.setState({
        originalValues: this.props.values,
        values: this.props.values,
        editing: false
      })
    }
    else if (this.props.values !== prevProps.values){
      this.setState({
        values: this.props.values
      })
    }
    if(this.props.originalValues !== prevProps.originalValues){
      this.setState({
        originalValues: this.props.originalValues
      })
    }
  }

  componentWillMount() {
    this.setState({
      originalValues: this.props.values,
      values: this.props.values,
      editing: false
    })
  }

  render() {
    if (this.state.editing){
        return(this.getMultiSelect())
    } else {
      const values = (this.state.values ? this.state.values : this.props.values)
      const valuesList = values.map(c => <div key={c.id}>{c.name}<br/></div>)
      return (
          <div className="rt-tr">
            <button className="btn btn-primary plainButton" onClick={this.handleClick}>
            {(values.length === 0 ? 'None' : valuesList)}
            </button>
          </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters.list,
    conditions: state.conditions.list
  }
}

export default connect(mapStateToProps)(ConditionsSelect);
