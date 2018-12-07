import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeEncounter, updateEncounter } from '../actions/encounterActions'
import { getSelect, getSelectOptions, getDeleteButton, getEditableTextField, getEditableButton, getEditableCheckBox } from '../util/components'
import ReactTable from 'react-table'
import '../css/App.css'
import 'react-table/react-table.css'

const NAME = {name: 'name', type: 'text'}
const STATUS = {name: 'status', type: 'select'}

class EncountersTable extends Component {
  state = {
      editableCell: {
        id: null,
        editableProp: null,
        value: null,
        originalValue: null,
        url: null
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
    this.props.dispatch(removeEncounter(url))
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
      this.props.dispatch(updateEncounter(editableCell))
    }
    this.resetEditableCell()
  }

  getCellValue = (row, prop) => {
    var cellValue
    switch(prop) {
      case NAME:
        cellValue = row.original.name
        break
      case STATUS:
        cellValue = row.original.status
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

      return getEditableButton({
        id: rowId,
        editableProp: prop,
        value: cellValue,
        displayValue: displayValue,
        originalValue: cellValue,
        url: row.original.request.url,
        isCheckBox: (prop.type === 'checkBox' ? true : false)
      },
      this.handleClick)
    }
  }

  getColumns = () => {
    return [
        {
          Header: 'Name',
          Cell: row => this.getCell(row,NAME),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}},
        },
        {
          Header: 'Status',
          Cell: row => this.getCell(row,STATUS),
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
    const { encounters } = this.props
    return(

      <div>
        <h3> Encounters Table </h3>
        <ReactTable
          data = {encounters}
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
    encounters: state.encounters.list
  }
}

export default connect(mapStateToProps)(EncountersTable);
