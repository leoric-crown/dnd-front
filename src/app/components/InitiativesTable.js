import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeInitiative, updateInitiative } from '../actions/initiativeActions'
import { getSelect, getSelectOptions, getDeleteButton, getEditableTextField, getEditableButton, getEditableCheckBox } from '../util/components'
import ReactTable from 'react-table'
import '../css/App.css'
import 'react-table/react-table.css'

const ENCOUNTER = {name: 'encounter', type: 'object'}
const CHARACTER = {name: 'character', type: 'object'}
const INITIATIVE = {name: 'initiative', type: 'text'}
const HIT_POINTS = {name: 'hitpoints', type: 'text', characterProp: true}
const MAX_HIT_POINTS = {name: 'maxhitpoints', type: 'text', characterProp: true}
const CONDITIONS = {name: 'conditions', type: 'select', characterProp: true}

class InitiativesTable extends Component {
  state = {
      editableCell: {
        id: null,
        editableProp: null,
        value: null,
        originalValue: null,
        url: null,
        isPlayer: false,
      }
  }

  resetEditableCell = () => {
    this.setState({
      editableCell: {
        id: null,
        editableProp: null,
        value: null,
        originalValue: null,
        url: null
      }
    })
  }

  handleDelete = url => {
    this.props.dispatch(removeInitiative(url))
  }

  handleClick = (payload) => {
    const { editableCell } = this.state.editableCell
    this.setState({
      editableCell: {
        ...editableCell,
        ...payload
      }
    })
  }

  handleInput = value => {
    const { editableCell } = this.state
    if(editableCell.isCheckBox) {
      this.handleSubmit()
    } else {
      this.setState({
        editableCell: {
          ...editableCell,
          ...{value: value}
        }
      })
    }
  }

  handleKeyUp = key => {
    switch(key) {
      case 'Enter':
        this.handleSubmit()
        break
      case 'Escape':
        this.resetEditableCell()
        break
      default:
        break
    }
  }

  handleSubmit = () => {
    const { editableCell } = this.state
    if (editableCell.value !== editableCell.originalValue) {
      this.props.dispatch(updateInitiative(editableCell))
    }
    this.resetEditableCell()
  }

  getCellValue = (row, prop) => {
    var cellValue
    const { characters } = this.props
    switch(prop) {
      case ENCOUNTER:
        cellValue = row.original.encounter._id
        break
      case CHARACTER:
        cellValue = row.original.character._id
        break
      case INITIATIVE:
        cellValue = row.original.initiative
        break
      case HIT_POINTS:
        cellValue = (row.original.characterStamp.player ?
          characters.find(element => {
            return element._id === row.original.character._id
          }).hitpoints:
          row.original.characterStamp.hitpoints
        )
        break
      case MAX_HIT_POINTS:
        cellValue = (row.original.characterStamp.player ?
          characters.find(element => {
            return element._id === row.original.character._id
          }).maxhitpoints:
          row.original.characterStamp.maxhitpoints
        )
        break
      default:
        break
    }
    return cellValue
  }

  getCell = (row, prop) => {
    var cellValue = this.getCellValue(row, prop)
    const { id, editableProp } = this.state.editableCell
    const rowId = row.original._id
    if( id === rowId && editableProp === prop) {
      const value = (this.state.editableCell.value == null) ? cellValue : this.state.editableCell.value
      switch(prop.type) {
        case 'checkBox':
          return getEditableCheckBox({
              value: value,
              prop: prop
            },
            this.handleInput)
        case 'select':
          return getSelect({
            propName: prop.name,
            value: value,
            options: getSelectOptions(prop.name),
            inline: true
          },{
            input: this.handleInput,
            resetEditableCell: this.resetEditableCell,
            submit: this.handleSubmit
          })
        case 'text':
          return getEditableTextField(value, {
            input: this.handleInput,
            keyUp: this.handleKeyUp,
            resetEditableCell: this.resetEditableCell
          })
        default:
          break
      }
    }
    else {
      var displayValue
      switch(prop.type) {
        case 'checkBox':
          displayValue = (cellValue ? prop.checked : prop.unchecked)
          break
        default:
          displayValue = cellValue
      }

      var url = row.original.request.url
      if(prop.characterProp){
        url = row.original.characterStamp.request.url
      }

      return getEditableButton({
        id: rowId,
        editableProp: prop,
        value: cellValue,
        displayValue: displayValue,
        originalValue: cellValue,
        url: url,
        player: row.original.characterStamp.player
      },
      this.handleClick)
    }
  }

  getColumns = () => {
    return [
        {
          Header: 'Encounter',
          Cell: row => {
            return (
              <div>
                {this.props.encounters.find((element) =>{
                    return element._id === row.original.encounter
                }).name}
              </div>
            )
          },
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'Character',
          Cell: row => {
            return (
              <div>{row.original.characterStamp.name} </div>
            )
          },
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'Initiative',
          Cell: row => this.getCell(row, INITIATIVE),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'HP',
          Cell: row => this.getCell(row, HIT_POINTS),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'Max HP',
          Cell: row => this.getCell(row, MAX_HIT_POINTS),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'Conditions',
          Cell: row => this.getCell(row, CONDITIONS),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: '',
          Cell: row => getDeleteButton(row, this.handleDelete),
          sortable: false,
          width: 100
        }
      ]
  }

  render() {
    console.log(this.state)
    const { initiatives } = this.props
    return(

      <div>
        <h3> Initiatives Table </h3>
        <ReactTable
          data = {initiatives}
          columns = {this.getColumns()}
          className  = "-striped -highlight"
          sortable = {true}
          defaultPageSize = {10}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initiatives: state.initiatives.list,
    encounters: state.encounters.list,
    characters: state.characters.list
  }
}

export default connect(mapStateToProps)(InitiativesTable);
