import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { ITEM_QUERY } from '../../Queries';
import { connect } from 'react-redux';
import { ifNotData } from '../../helpers';
import parse from 'html-react-parser';
import { withRouter } from 'react-router-dom';
// Components
import ChooseIcon from '../BigCart/ChooseIcon';
import ColorIcon from '../BigCart/ColorIcon';
import Button from '../UI/Button';
// Styles
import classes from './ItemView.module.css';

class ItemView extends Component {
  state = {
    photoIndex: 0,
    selectedData: {},
  };

  inStockChecker = (inStock, data, selectingCheck) => {
    return inStock ? (
      <Button
        title="add to cart"
        disabled={selectingCheck}
        onClick={(e) => this.settingData(data.product)}
        className={classes.add}
      ></Button>
    ) : (
      <Button
        title="out of stock"
        className={`${classes.add}`}
        disabled={true}
      ></Button>
    );
  };

  galleryRender = (gallery, name) =>
    gallery.map((photo, inx) => (
      <img
        key={inx}
        onClick={() => this.photoChanger(inx)}
        src={photo}
        alt={name}
      />
    ));

  attributesRender = (attributes) => {
    return attributes.map((attribute, inx) => {
      return (
        <div key={inx}>
          <p>{attribute.name}</p>
          <div className={classes.attributeContainer}>
            {attribute.items.map((item, i) => {
              if (attribute.name === 'Color') {
                return (
                  <ColorIcon
                    key={item.value + i + inx}
                    onClick={(e) =>
                      this.selected(e, item.value, attribute.name)
                    }
                    id={item.value + i + inx}
                    group={attribute.name}
                    value={item.displayValue}
                  />
                );
              } else {
                return (
                  <ChooseIcon
                    key={item.value + i + inx}
                    id={item.value + i + inx}
                    onClick={(e) =>
                      this.selected(e, item.value, attribute.name)
                    }
                    title={item.value}
                    group={attribute.name}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    });
  };

  radioInputReset = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    this.setState({ selectedData: {} });
    radioButtons.forEach((button) => (button.checked = false));
  };

  selected = (e, itemValue, name) => {
    e.stopPropagation();
    const attributeValue = itemValue;

    return this.setState({
      selectedData: {
        ...this.state.selectedData,
        [`${name}`]: attributeValue,
      },
    });
  };

  photoChanger = (index) => {
    this.setState({ photoIndex: index });
  };

  settingData = (arg) => {
    const argSelected = {
      ...arg,
      id: `${arg.id}${Math.floor(Math.random() * 100)}`,
      selected: this.state.selectedData,
    };
    this.props.addToCart(argSelected);
    this.radioInputReset();
  };

  render() {
    const { currencyIndex } = this.props;
    const { photoIndex } = this.state;
    return (
      <Query
        query={ITEM_QUERY}
        variables={{ id: this.props.match.params.productID }}
      >
        {({ loading, error, data }) => {
          if (!data) {
            return ifNotData(loading, error);
          }
          if (data) {
            const {
              name,
              gallery,
              brand,
              description,
              prices,
              attributes,
              inStock,
            } = data.product;

            const selectingCheck = !(
              Object.keys(this.state.selectedData).length === attributes.length
            );
            return (
              <section className={classes.main}>
                <aside className={classes.side}>
                  {this.galleryRender(gallery, name)}
                </aside>
                <div className={classes.mainImg}>
                  <img src={gallery[photoIndex]} alt="Current" />
                </div>
                <div className={classes.info}>
                  <div className={classes.title}>
                    {brand}
                    <div className={classes.subtitle}>{name}</div>
                  </div>
                  <div className={classes.attributes}>
                    {this.attributesRender(attributes)}
                  </div>
                  <div className={classes.price}>
                    price:
                    <div>
                      {prices[currencyIndex].currency.symbol}
                      {prices[currencyIndex].amount}
                    </div>
                  </div>
                  {this.inStockChecker(inStock, data, selectingCheck)}
                  <div className={classes.description}>
                    {parse(description)}
                  </div>
                </div>
              </section>
            );
          }
        }}
      </Query>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    currencyIndex: state.currencyIndex,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    addToCart: (item) => dispatch({ type: 'add_to_cart', value: item }),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(ItemView));
