import { gql } from '@apollo/client';

const NAVBAR_QUERY = gql`
  query navbar {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export { NAVBAR_QUERY };

const PRODUCTS_LIST = gql`
  query getItemList($input: CategoryInput) {
    category(input: $input) {
      products {
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
        id
        brand
        name
        inStock
        category
        gallery
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }
`;

export { PRODUCTS_LIST };

const ITEM_QUERY = gql`
  query getItem($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      brand
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      description
    }
  }
`;

export { ITEM_QUERY };
