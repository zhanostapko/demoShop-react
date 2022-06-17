import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import AmountBar from './AmountBar';
import ColorIcon from '../BigCart/ColorIcon';
import ChooseIcon from '../BigCart/ChooseIcon';
// Styles
import classes from './CartItem.module.css';

class CartItem extends Component {
  selectedAttributesRender = (attributes, selectedNames, selected) => {
    return attributes.map((attribute, inx) => {
      return (
        <div key={inx}>
          <p>{attribute.name}:</p>
          <div className={classes.attributeContainer}>
            {attribute.items.map((item, i) => {
              const selectedTrue = () => {
                if (
                  selectedNames.find((selected) => selected === attribute.name)
                ) {
                  const selectedItem =
                    selected[attribute.name] === item.value ? false : true;

                  return selectedItem;
                }
              };
              if (attribute.name === 'Color') {
                return (
                  <ColorIcon
                    checked={!selectedTrue()}
                    isDisabled={selectedTrue()}
                    className={this.props.iconClass}
                    key={item.value + i + inx}
                    id={item.value + i + inx}
                    group={`${attribute.name}${Math.floor(
                      Math.random() * 100
                    )}`}
                    value={item.displayValue}
                  />
                );
              } else {
                return (
                  <ChooseIcon
                    checked={!selectedTrue()}
                    isDisabled={selectedTrue()}
                    className={this.props.iconClass}
                    key={item.value + i + inx}
                    id={item.value + i + inx}
                    title={item.value}
                    group={`${attribute.name}${Math.floor(
                      Math.random() * 100
                    )}`}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    });
  };
  render() {
    const {
      name,
      brand,
      img,
      price,
      attributes,
      className,
      qty,
      increase,
      decrease,
      selected,
    } = this.props;

    const selectedNames = Object.keys(selected);
    return (
      <div className={classes.wrapper}>
        <div className={classes.description}>
          <div className={classes.title}>
            {brand} {name}
          </div>
          <div className={classes.price}>
            {price.currency.symbol}
            {price.amount.toFixed(2)}
          </div>
          <div className={`${classes.sizes} ${className}`}>
            {this.selectedAttributesRender(attributes, selectedNames, selected)}
          </div>
        </div>
        <div className={classes.amount}>
          <AmountBar qty={qty} decrease={decrease} increase={increase} />
          <div className={classes.imgContainer}>
            <img className={classes.itemImg} src={img} alt="Item in cart img" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    itemsInCart: state.itemsInCart,
  };
};

export default connect(mapStateToProp)(CartItem);
