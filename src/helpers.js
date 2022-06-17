import Loader from './components/UI/Loader';
export const totalAmount = (itemsInCart) =>
  itemsInCart.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

export const currencySymbol = (itemsInCart, currencyIndex) =>
  itemsInCart[0]?.prices[currencyIndex].currency.symbol;

export const totalPrice = (itemsInCart, currencyIndex) =>
  itemsInCart.reduce((currentPrice, item) => {
    return currentPrice + item.prices[currencyIndex].amount * item.amount;
  }, 0);

export const ifNotData = (loading, error) => {
  if (loading === true) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error... {error.message}</h1>;
  }
};
