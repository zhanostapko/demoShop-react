import React, { Component } from 'react';
// Styles
import classes from './ColorIcon.module.css';

export default class SizesIcon extends Component {
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
        <label className={classes.size} htmlFor={this.props.id}>
          <div
            value={this.props.value}
            onClick={this.props.onClick}
            style={{
              backgroundColor: this.props.value,
            }}
          ></div>
        </label>
      </div>
    );
  }
}
