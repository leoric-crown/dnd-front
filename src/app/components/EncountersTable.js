import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEncounters } from '../actions/encounterActions'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class EncountersTable extends Component {

  handleDelete = async (row) => {
    await fetch(row.original.request.url, {
      method: 'DELETE',
      header: {'Content-Type': 'application/json'}
    })
    this.props.dispatch(getEncounters())
  }
  render() {
    const { encounters } = this.props

    const tableColumns = [
        {
          Header: 'Name',
          accessor: 'name',
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
          }
        },
        {
          Header: 'Actions',
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
              <button className="btn btn-primary" onClick={() => this.handleDelete(row)
              }>
              Delete
              </button>
            </div>
          )
        }
      ]

    return(

      <div>
        <h3> Encounters Table </h3>
        <ReactTable
          getTrProps={(state,rowInfo,column) => {
            var props = {
              style: {}
            }
            if(rowInfo && rowInfo.row && rowInfo.row.name) {
              props.style.backgroundColor = (rowInfo.row.name === 'Rhuuan' ? 'green' : null)
            }
            return props
          }}
          data = {encounters}
          columns = {tableColumns}
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
