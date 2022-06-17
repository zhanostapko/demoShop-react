import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
// Styles
import classes from './Currency.module.css';
// Assets
import arrowDown from '../../../assets/Vector.png';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.divRef = createRef();
  }
  state = {
    dropdown: false,
  };

  currenciesList = (currencies) => {
    return currencies.map((item, inx) => {
      return (
        <li
          onClick={(e) => {
            this.currencyChange(e, inx);
          }}
          key={item.label}
        >
          {item.symbol} {item.label}
        </li>
      );
    });
  };

  closeDropdown = (e) => {
    if (e.path[0] !== this.divRef.current) {
      return this.setState({ dropdown: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }

  dropdownHandler = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  currencyChange = (e, inx) => {
    e.stopPropagation();
    this.props.currencyIndexChanger(inx);
    this.setState({
      dropdown: false,
    });
  };

  currencyQuery = () => {
    const { currencies } = this.props.data;
    const { currencyIndex } = this.props;
    if (currencies) {
      return (
        <>
          <div ref={this.divRef} className={classes.selected}>
            {currencies[currencyIndex].symbol}
            <img src={arrowDown} alt="Arrow down" />
          </div>
          <div className={classes.dropdownContainer}>
            {this.state.dropdown && (
              <ul className={classes.dropdown}>
                {this.currenciesList(currencies)}
              </ul>
            )}
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <div onClick={this.dropdownHandler} className={classes.currency}>
        {this.currencyQuery()}
      </div>
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
    currencyIndexChanger: (index) =>
      dispatch({ type: 'change_currency', value: index }),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Currency);
