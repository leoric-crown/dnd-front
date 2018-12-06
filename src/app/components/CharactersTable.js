import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeCharacter, updateCharacter } from '../actions/characterActions'
import { getSelect, getSelectOptions, getDeleteButton, getEditableTextField, getEditableButton, getEditableCheckBox} from '../util/components'
import ReactTable from 'react-table'
import '../css/App.css'
import 'react-table/react-table.css'

const NAME = {name: 'name', type: 'text'}
const LEVEL = {name: 'level', type: 'select'}
const ARMOR_CLASS = {name: 'armorclass', type: 'text'}
const MAX_HIT_POINTS = {name: 'maxhitpoints', type: 'text'}
const CONDITIONS = {name: 'conditions', type: 'select'}
const PLAYER = {name: 'player', type: 'checkBox', checked: 'Yes', unchecked: 'No'}

class CharactersTable extends Component {
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
    this.props.dispatch(removeCharacter(url))
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
      this.props.dispatch(updateCharacter(editableCell))
    } else if (editableCell.isCheckBox){
      editableCell.value = !editableCell.value
      this.props.dispatch(updateCharacter(editableCell))
    }
    this.resetEditableCell()
  }

  getCellValue = (row, prop) => {
    var cellValue
    switch(prop) {
      case NAME:
        cellValue = row.original.name
        break
      case LEVEL:
        cellValue = row.original.level
        break
      case ARMOR_CLASS:
        cellValue = row.original.armorclass
        break
      case MAX_HIT_POINTS:
        cellValue = row.original.maxhitpoints
        break
      case PLAYER:
        cellValue = row.original.player
        break
      case CONDITIONS:
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
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}}
        },
        {
          Header: 'Level',
          Cell: row => (this.getCell(row,LEVEL)),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}}
        },
        {
          Header: 'Armor Class',
          Cell: row => this.getCell(row,ARMOR_CLASS),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}}
        },
        {
          Header: 'Max HP',
          Cell: row => this.getCell(row,MAX_HIT_POINTS),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}}
        },
        {
          Header: 'Player',
          Cell: row => this.getCell(row,PLAYER),
          getHeaderProps: () => {return {style: {fontWeight: 'bold'}}}
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
    const { characters } = this.props
    return(

      <div>
        <h3> Characters Table </h3>
        <ReactTable
          data = {characters}
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
    characters: state.characters.list
  }
}

export default connect(mapStateToProps)(CharactersTable);
