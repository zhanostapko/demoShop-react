import React, { Component } from 'react';
import { connect } from 'react-redux';
import { totalAmount, currencySymbol, totalPrice } from '../../helpers';
// Styles
import classes from './BigCart.module.css';
// Components
import CartItemBig from './CartItemBig';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

class BigCart extends Component {
  state = { ordered: false };

  isCartEmpty = (itemsInCart) => {
    return !totalAmount(itemsInCart) ? (
      <h2>Your cart is empty</h2>
    ) : (
      itemsInCart.map((item, inx) => {
        return (
          <CartItemBig
            increase={() => this.increase(item)}
            decrease={() => this.decrease(item)}
            qty={item.amount}
            key={inx}
            name={item.name}
            brand={item.brand}
            prices={item.prices}
            gallery={item.gallery}
            attributes={item.attributes}
            selected={item.selected}
          />
        );
      })
    );
  };

  increase = (item) => {
    this.props.increaseAmount(item);
  };

  decrease = (item) => {
    this.props.decreaseAmount(item);
  };

  modalClose = () => {
    this.setState({ ordered: false });
  };

  orderClicked = (e) => {
    e.stopPropagation();
    this.setState({ ordered: true });
  };
  render() {
    const taxPercentage = 0.21;
    const { itemsInCart, currencyIndex } = this.props;
    return (
      <>
        {this.state.ordered && (
          <Modal
            className={classes.backdrop}
            modalClose={this.modalClose}
            modalOpen={this.state.ordered}
            title="Thank you for your purchase"
          />
        )}
        <section className={classes.container}>
          <div className={classes.title}>Cart</div>
          {this.isCartEmpty(itemsInCart)}

          <div className={classes.totalContainer}>
            <div className={classes.tax}>
              Tax:
              <span>
                {currencySymbol(itemsInCart, currencyIndex)}
                {(
                  totalPrice(itemsInCart, currencyIndex) * taxPercentage
                ).toFixed(2)}
              </span>
            </div>
            <div className={classes.qty}>
              Qty: <span>{totalAmount(itemsInCart)}</span>
            </div>
            <div className={classes.totalPrice}>
              Total:
              <span>
                {currencySymbol(itemsInCart, currencyIndex)}
                {totalPrice(itemsInCart, currencyIndex).toFixed(2)}
              </span>
            </div>
            <Button
              title="Order"
              disabled={!totalAmount(itemsInCart)}
              onClick={this.orderClicked}
              className={classes.order}
            />
          </div>
        </section>
      </>
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

export default connect(mapStateToProp, mapDispatchToProp)(BigCart);
