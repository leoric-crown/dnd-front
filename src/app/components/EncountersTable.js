import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeEncounter } from '../actions/encounterActions'
import ReactTable from 'react-table'
import '../css/App.css'
import 'react-table/react-table.css'

const NAME = 'name'
const STATUS = 'status'

class EncountersTable extends Component {
  state = {
      editableCell: {
        id: null,
        editableProp: null,
        value: null
      }
  }

  handleDelete = url => {
    this.props.dispatch(removeEncounter(url))
  }

  handleClick = (id, prop, value) => {
    const { editableCell } = this.state.editableCell
    this.setState({
      editableCell: {
        ...editableCell,
        ...{
          id: id,
          editableProp: prop,
          value: value,
        }
      }
    })
  }

  handleInput = value => {
    const { editableCell } = this.state
    this.setState({
      editableCell: {
        ...editableCell,
        ...{value: value}
      }
    })
  }

  handleKeyUp = key => {
    const { editableCell } = this.state
    switch(key) {
      case 'Enter':
      case 'Escape':
        this.setState({
          editableCell: {
            ...editableCell,
            ...{
              id: null,
              editableProp: null,
              value: null
            }
          }
        })
        break
      default:
        break
    }
  }

  getCell = (row, prop) => {
    var rowValue
    switch(prop) {
      case NAME:
        rowValue = row.original.name
        break
      case STATUS:
        rowValue = row.original.status
        break
      default:
        break
    }

    const { id, editableProp } = this.state.editableCell
    const rowId = row.original._id
    if( id === rowId && editableProp === prop) {
      const value = (this.state.editableCell.value == null) ? rowValue : this.state.editableCell.value
      return (
        <div>
          <input type = 'text'
            autoFocus
            value = {value}
            onChange = {event => {this.handleInput(event.target.value)}}
            onKeyUp = {event => {this.handleKeyUp(event.key)}}
            onBlur = {console.log('blur')}
            onFocus = {console.log('focus')}
            style = { {textAlign: 'center', width:'50%'} }
          />
        </div>
      )
    }

    return (
      <div>
        <div></div>
        <button className="btn btn-primary editableButton" onClick={() => this.handleClick(row.original._id, prop, rowValue)}>
        {rowValue}
        </button>
      </div>
    )
  }

  getColumns = () => {
    return [
        {
          Header: 'Name',
          Cell: row => this.getCell(row,NAME),
          getProps: (state, rowInfo, column) => {
            return {
              style: {
                textAlign: 'center'
              }
            }
          },
          getHeaderProps: (state, rowInfo, column, instance) => {
            return {
              style: {
                fontWeight: 'bold'
              }
            }
          }
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: row => (this.getCell(row,STATUS)),
          getProps: (state, rowInfo, column) => {
            return{
              style: {
                textAlign: 'center'
              }
            }
          },
          getHeaderProps: (state, rowInfo, column, instance) => {
            return {
              style: {
                fontWeight: 'bold'
              }
            }
          },
        },
        {
          Header: '',
          sortable: false,
          width: 100,
          getProps: (state, rowInfo, column) => {
            return{
              style: {
                textAlign: 'center'
              }
            }
          },
          getHeaderProps: (state, rowInfo, column, instance) => {
            return {
              style: {
                fontWeight: 'bold'
              }
            }
          },
          Cell: row => (
            <div>
              <button className="btn btn-primary" onClick={() => this.handleDelete(row.original.request.url)
              }>
              Delete
              </button>
            </div>
          )
        }
      ]
  }

  render() {
    const { encounters } = this.props
    console.log(this.state)
    return(

      <div>
        <h3> Encounters Table </h3>
        <ReactTable
          data = {encounters}
          columns = {this.getColumns()}
          className  = "-striped -highlight"
          sortable = {true}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    encounters: state.encounters.list,
    testing: state.template.testing
  }
}

export default connect(mapStateToProps)(EncountersTable);
