import React, { Component } from 'react';
// Styles
import classes from './Button.module.css';

export default class Button extends Component {
  render() {
    const styles = `${classes.btn} ${
      this.props.className ? this.props.className : ''
    }`;
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={styles}
      >
        {this.props.title}
      </button>
    );
  }
}
