import React, { Component } from 'react';
// Styles
import classes from './Slider.module.css';
// Images
import arrowLeft from '../../assets/chevron-left.png';
import arrowRight from '../../assets/chevron-right.png';

export default class Slider extends Component {
  render() {
    return (
      <div className={classes.img}>
        <img
          className={classes.itemImg}
          src={this.props.gallery[this.props.sliderIndex]}
          alt="Current slide"
        />
        {this.props.gallery.length !== 1 && (
          <>
            <img
              onClick={this.props.prevSlide}
              className={`${classes.arrow} ${classes.arrowLeft}`}
              src={arrowLeft}
              alt="Arrow left"
            />
            <img
              onClick={this.props.nextSlide}
              className={`${classes.arrow} ${classes.arrowRight}`}
              src={arrowRight}
              alt="Arrow right"
            />
          </>
        )}
      </div>
    );
  }
}
