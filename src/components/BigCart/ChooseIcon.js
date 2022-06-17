import React, { Component } from 'react';
// Styles
import classes from './ChooseIcon.module.css';

export default class ChooseIcon extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <input
          type="radio"
          id={this.props.id}
          disabled={this.props.isDisabled}
          name={this.props.group}
          checked={this.props.checked}
          readOnly
        />
        <label
          value={this.props.value}
          onClick={this.props.onClick}
          className={`${classes.size} ${this.props.className}`}
          htmlFor={this.props.id}
        >
          {this.props.title}
        </label>
      </div>
    );
  }
}
