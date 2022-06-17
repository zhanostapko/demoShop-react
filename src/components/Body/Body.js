import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { PRODUCTS_LIST } from '../../Queries';
import { connect } from 'react-redux';
import { ifNotData } from '../../helpers';
// Styles
import classes from './Body.module.css';
// Components
import ProductItem from './ProductItem';

class Body extends Component {
  state = { title: this.props.title };

  productListRender = (data, currencyIndex) => {
    return data.category.products.map((item) => {
      return (
        <Link key={item.id} to={`/item/${item.id}`}>
          <ProductItem
            add={(e) => this.settingData(e, item)}
            inStock={item.inStock}
            id={item.id}
            brand={item.brand}
            title={item.name}
            price={
              item.prices[currencyIndex].currency.symbol +
              item.prices[currencyIndex].amount
            }
            src={item.gallery[0]}
          />
        </Link>
      );
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.setState({
        title: this.props.title,
      });
    }
  }

  settingData = (e, arg) => {
    e.preventDefault();
    const selectedObj = arg.attributes.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: cur.items[0].value }),
      {}
    );
    const cartOpt = {
      ...arg,
      id: `${arg.id}${Math.floor(Math.random() * 100)}`,
      selected: selectedObj,
      amount: 1,
    };
    this.props.addToCart(cartOpt);
  };

  render() {
    const { currencyIndex } = this.props;
    return (
      <Query
        query={PRODUCTS_LIST}
        variables={{ input: { title: this.state.title.toLowerCase() } }}
      >
        {({ loading, error, data }) => {
          if (!data) {
            return ifNotData(loading, error);
          }
          if (data) {
            return (
              <header>
                <h1 className={classes.title}>{this.state.title}</h1>
                <div className={classes.itemsList}>
                  {this.productListRender(data, currencyIndex)}
                </div>
              </header>
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

export default connect(mapStateToProp, mapDispatchToProp)(Body);
