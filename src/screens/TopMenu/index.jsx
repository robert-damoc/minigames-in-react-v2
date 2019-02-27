import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './TopMenu.scss'

class TopMenu extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default TopMenu;
