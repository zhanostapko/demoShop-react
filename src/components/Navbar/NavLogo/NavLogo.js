import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Assets
import logo from '../../../assets/logo.png';

export default class NavLogo extends Component {
  render() {
    return (
      <>
        <Link to="/">
          <img onClick={this.props.onClick} src={logo} alt="Cart logo" />
        </Link>
      </>
    );
  }
}
