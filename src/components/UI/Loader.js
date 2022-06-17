import React, { Component } from 'react';
// Styles
import classes from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={classes['spinner-container']}>
        <div className={classes['loading-spinner']}></div>
      </div>
    );
  }
}

export default Loader;
