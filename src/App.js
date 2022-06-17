import React, { Component, createRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Components

import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';
import MiniCart from './components/MiniCart/MiniCart';
import ItemView from './components/ItemView/ItemView';
import BigCart from './components/BigCart/BigCart';

const client = new ApolloClient({
  uri: 'https://shop-endpoint.herokuapp.com/',
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.divRef = createRef();
    this.miniRef = createRef();
  }
  state = {
    cartClick: false,
    filteringArgument: JSON.parse(localStorage.getItem('categoryHandler'))
      ? JSON.parse(localStorage.getItem('categoryHandler'))[1]
      : 'ALL',
    itemId: '',
  };

  closeDropdown = (e) => {
    if (
      e.path[0] !== this.divRef.current &&
      !this.miniRef.current?.contains(e.target)
    ) {
      return this.setState({ cartClick: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }

  toggleModal = () => {
    this.setState({ cartClick: !this.state.cartClick });
  };

  openCart = (e) => {
    this.setState({ cartClick: false });
  };

  filteringArgument = (filter) => {
    this.setState({ filteringArgument: filter });
  };

  filterReset = () => {
    const variables = [0, 'ALL'];
    window.localStorage.setItem('categoryHandler', JSON.stringify(variables));
    this.setState({ filteringArgument: 'ALL' });
  };
  render() {
    const { filteringArgument } = this.state;
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <Navbar
            categoryHandler={this.filteringArgument}
            onClick={this.toggleModal}
            filterReset={this.filterReset}
            cartRef={this.divRef}
          />
          {this.state.cartClick && (
            <MiniCart
              openCart={this.openCart}
              miniRef={this.miniRef}
              open={this.state.cartClick}
            />
          )}
          <Switch>
            <Route exact path="/">
              <Body title={filteringArgument} />
            </Route>
            <Route path="/cart">
              <BigCart />
            </Route>
            <Route path="/item/:productID">
              <ItemView />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
