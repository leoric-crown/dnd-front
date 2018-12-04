import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/App.css';

class Nav extends Component {

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <div>
              <NavLink to='/encounters' exact activeClassName='active'>
                Encounters
              </NavLink>
              <NavLink to='/characters' exact activeClassName='active'>
                Characters
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav