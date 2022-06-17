import React, { Component } from 'react';
// Styles
import classes from './Backdrop.module.css';

export default class Backdrop extends Component {
  componentDidMount() {
    if (this.props.open) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  render() {
    return (
      <div className={`${classes.backdrop} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}
