import { createStore } from 'redux';

const initialStore = {
  currencyIndex: 0,
  itemsInCart: [],
  totalPrice: 0,
};

const Reducer = (state = initialStore, action) => {
  if (action.type === 'change_currency') {
    return { ...state, currencyIndex: action.value };
  }
  if (action.type === 'add_to_cart') {
    const matched = state.itemsInCart.find(
      (item) =>
        item.name === action.value.name &&
        JSON.stringify(item.selected) === JSON.stringify(action.value.selected)
    );
    if (matched) {
      matched.amount++;
      return {
        ...state,
        itemsInCart: [...state.itemsInCart],
      };
    } else {
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, { ...action.value, amount: 1 }],
      };
    }
  }
  if (action.type === 'increase_quantity') {
    return {
      ...state,
      itemsInCart: state.itemsInCart.filter((item) => {
        return item.id === action.value.id ? item.amount++ : item.amount;
      }),
    };
  }

  if (action.type === 'decrease_quantity') {
    if (action.value.amount === 1) {
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter((item) => {
          return item.id !== action.value.id;
        }),
      };
    } else {
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter((item) => {
          return item.id === action.value.id ? item.amount-- : item.amount;
        }),
      };
    }
  }
  return state;
};

const store = createStore(Reducer);

export default store;
