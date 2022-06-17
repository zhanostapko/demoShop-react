import React, { Component, createRef } from 'react';
import cartIcon from '../../../assets/emptyCart.png';
import { connect } from 'react-redux';
import { totalAmount } from '../../../helpers';
// Styles
import classes from './CartLogo.module.css';

class CartLogo extends Component {
  constructor(props) {
    super(props);
    this.cartRef = createRef();
  }

  render() {
    const { itemsInCart } = this.props;
    return (
      <div className={classes.cart} onClick={this.props.onClick}>
        <img ref={this.props.cartRef} src={cartIcon} alt="Cart icon" />
        {totalAmount(itemsInCart) ? (
          <span>{totalAmount(itemsInCart)}</span>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    itemsInCart: state.itemsInCart,
  };
};

export default connect(mapStateToProp)(CartLogo);
