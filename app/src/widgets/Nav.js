import React, { Component } from 'react';
import Login from './auth/Login.js';
import Logout from './auth/Logout.js';
import { Link } from 'react-router-dom';
import { Feather } from 'react-feather';

class Nav extends Component {
  render () {
    return (
      <nav className="bg-white bb b--black-10 shadow-6 pa3 mb4">
        <div className="mw8 center lh-2 flex">
          <div className="flex-auto flex items-center">
            <Link to="/" className="merriweather black-90 b ttl">Initiativet<span className="i-green">.</span></Link>
          </div>
          <div className="flex-auto tr">
            <Link to="/" className="db di-ns black-90 hover-black-70 mr3-ns">Lovforslag</Link>
            <Link to="/preferences" className="db di-ns black-90 hover-black-70 mr3-ns">Indstillinger</Link>
            {window.sessionStorage.authToken ?
            <Logout history={this.props.history} className="db di-ns pointer dark-blue hover-blue"/>
            : <Login className="db di-ns pointer dark-blue hover-blue" type="login" />
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav;
