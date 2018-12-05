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
            </div>
          </li>
          <li>
            <div>
              <NavLink to='/characters' exact activeClassName='active'>
                Characters
              </NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink to='/initiatives' exact activeClassName='active'>
                Initiatives
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
