import React, { Component } from 'react';
/* to allow us to link to different routes */
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Users Managment</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Display users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/addUsers" className="nav-link">Get Users</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}