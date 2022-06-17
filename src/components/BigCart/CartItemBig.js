import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
import classes from './CartItemBig.module.css';

// Components
import AmountBar from '../Cart/AmountBar';
import ChooseIcon from './ChooseIcon';
import ColorIcon from './ColorIcon';
import Slider from './Slider';

class CartItemBig extends Component {
  state = { sliderIndex: 0 };

  selectedAttributesRender = (attributes, selectedNames, selected) => {
    return attributes.map((attribute, inx) => {
      return (
        <div key={inx}>
          <p>{attribute.name}</p>
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

  nextSlide = () => {
    this.setState({
      sliderIndex:
        this.state.sliderIndex >= this.props.gallery.length - 1
          ? 0
          : this.state.sliderIndex + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      sliderIndex:
        this.state.sliderIndex <= 0
          ? this.props.gallery.length - 1
          : this.state.sliderIndex - 1,
    });
  };
  render() {
    const {
      brand,
      name,
      prices,
      currencyIndex,
      gallery,
      attributes,
      increase,
      decrease,
      qty,
      selected,
    } = this.props;
    const { sliderIndex } = this.state;
    const selectedNames = Object.keys(selected);
    return (
      <div className={classes.item}>
        <div className={classes.info}>
          <div className={classes.title}>
            {brand}
            <div className={classes.subtitle}>{name}</div>
          </div>
          <div className={classes.price}>
            {prices[currencyIndex].currency.symbol}
            {prices[currencyIndex].amount.toFixed(2)}
          </div>
          <div className={classes.sizes}>
            {this.selectedAttributesRender(attributes, selectedNames, selected)}
          </div>
        </div>
        <div className={classes.actions}>
          <AmountBar
            qty={qty}
            decrease={decrease}
            increase={increase}
            className={classes.quantity}
          />
          <Slider
            gallery={gallery}
            sliderIndex={sliderIndex}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    currencyIndex: state.currencyIndex,
  };
};

export default connect(mapStateToProp)(CartItemBig);
