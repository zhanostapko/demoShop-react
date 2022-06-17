import React, { Component } from 'react';
import classes from './ProductItem.module.css';
import cart from '../../assets/emptyCart1.png';

class ProductItem extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        id={this.props.id}
        className={`${classes['item-container']} ${
          !this.props.inStock && classes.outOfStock
        }`}
      >
        <img src={this.props.src} alt={this.props.title} />
        <h2 className={classes.name}>
          {this.props.brand} {this.props.title}
        </h2>
        <span className={classes.price}>{this.props.price}</span>
        {this.props.inStock && (
          <div onClick={this.props.add} className={classes.cart}>
            <img src={cart} alt="Add cart" />
          </div>
        )}
      </div>
    );
  }
}

export default ProductItem;
