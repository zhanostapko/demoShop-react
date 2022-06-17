import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { totalAmount, currencySymbol, totalPrice } from '../../helpers';
// Components
import CartItem from '../Cart/CartItem';
import Backdrop from '../UI/Backdrop';
import Button from '../UI/Button';
// Styles
import classes from './MiniCart.module.css';

class MiniCart extends Component {
  isCartEmpty = (itemsInCart, currencyIndex) => {
    return !totalAmount(itemsInCart) ? (
      <h2 className={classes.empty}>Your cart is empty</h2>
    ) : (
      <div className={classes.total}>
        <span>Total</span>
        <span>
          {currencySymbol(itemsInCart, currencyIndex)}
          {totalPrice(itemsInCart, currencyIndex).toFixed(2)}
        </span>
      </div>
    );
  };
  itemInCartRender = (itemsInCart, currencyIndex) => {
    return itemsInCart.map((item, inx) => {
      const { name, brand, id, gallery, prices, attributes, selected } = item;
      return (
        <CartItem
          increase={() => this.increase(item)}
          decrease={(e) => this.decrease(e, item)}
          qty={item.amount}
          iconClass={classes.iconStyles}
          className={classes.attributes}
          price={prices[currencyIndex]}
          img={gallery[0]}
          key={id + inx}
          name={name}
          brand={brand}
          attributes={attributes}
          selected={selected}
        />
      );
    });
  };
  increase = (item) => {
    this.props.increaseAmount(item);
  };

  decrease = (e, item) => {
    e.stopPropagation();
    this.props.decreaseAmount(item);
  };
  render() {
    const { itemsInCart, currencyIndex } = this.props;
    return (
      <Backdrop open={this.props.open}>
        <div ref={this.props.miniRef} className={classes.modal}>
          <div className={classes.title}>
            My bag,<span> {totalAmount(itemsInCart)} items</span>
          </div>
          <div className={classes.itemContainer}>
            {this.itemInCartRender(itemsInCart, currencyIndex)}
          </div>

          {this.isCartEmpty(itemsInCart, currencyIndex)}
          <div className={classes.actions}>
            <Link to="/cart">
              <Button
                onClick={() => this.props.openCart()}
                title="view bag"
                className={classes.view}
              ></Button>
            </Link>
            <Button title="check out" />
          </div>
        </div>
      </Backdrop>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    itemsInCart: state.itemsInCart,
    currencyIndex: state.currencyIndex,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    increaseAmount: (item) =>
      dispatch({ type: 'increase_quantity', value: item }),
    decreaseAmount: (item) =>
      dispatch({ type: 'decrease_quantity', value: item }),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(MiniCart);
