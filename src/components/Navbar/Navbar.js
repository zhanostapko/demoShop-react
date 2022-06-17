import React, { Component } from 'react';
import { NAVBAR_QUERY } from '../../Queries';
import { Query } from '@apollo/client/react/components';
import { ifNotData } from '../../helpers';

// Component
import Currency from './Currency/Currency';
import NavLogo from './NavLogo/NavLogo';
import CartLogo from './CartLogo/CartLogo';
import MenuLink from './MenuLink/MenuLink';
// Styles
import classes from './Navbar.module.css';

class Navbar extends Component {
  state = {
    active: JSON.parse(localStorage.getItem('categoryHandler'))
      ? +JSON.parse(localStorage.getItem('categoryHandler'))[0]
      : 0,
  };

  menuLinks = (data) => {
    return data.categories.map((item, inx) => {
      return (
        <MenuLink
          activeState={this.state.active}
          onClick={(e) => {
            this.filteringList(e);
          }}
          key={item.name}
          id={inx}
          title={item.name}
        />
      );
    });
  };

  filteringList = (e) => {
    const variables = [e.target.id, e.target.innerText];
    window.localStorage.setItem('categoryHandler', JSON.stringify(variables));
    this.setState({ active: +e.target.id });
    this.props.categoryHandler(e.target.innerText);
  };

  filteringReset = () => {
    this.setState({ active: 0 });
    this.props.filterReset();
  };
  render() {
    return (
      <Query query={NAVBAR_QUERY}>
        {({ loading, data, error }) => {
          if (!data) {
            return ifNotData(loading, error);
          }

          if (data) {
            return (
              <nav className={classes.navbar}>
                <ul className={classes.navLinks}>{this.menuLinks(data)}</ul>
                <NavLogo onClick={this.filteringReset} />
                <div className={classes.actions}>
                  <Currency data={data} />
                  <CartLogo
                    onClick={this.props.onClick}
                    cartRef={this.props.cartRef}
                  />
                </div>
              </nav>
            );
          }
        }}
      </Query>
    );
  }
}

export default Navbar;
