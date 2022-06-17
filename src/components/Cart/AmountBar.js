import React, { Component } from 'react';
// Styles
import classes from './AmountBar.module.css';

class AmountBar extends Component {
  render() {
    const styles = `${classes.quantity} ${
      this.props.className ? this.props.className : ''
    }`;

    return (
      <div className={styles}>
        <button onClick={this.props.increase} className={classes.btn}>
          +
        </button>
        <div>{this.props.qty}</div>
        <button onClick={this.props.decrease} className={classes.btn}>
          -
        </button>
      </div>
    );
  }
}

export default AmountBar;
