import React, { Component } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
// Styles
import classes from './MenuLink.module.css';

export default class MenuLink extends Component {
  render() {
    return (
      <li
        className={`${classes.link} ${
          this.props.activeState === this.props.id ? classes.active : ''
        } `}
      >
        <NavLink id={this.props.id} to="/" onClick={this.props.onClick}>
          {this.props.title}
        </NavLink>
      </li>
    );
  }
}
