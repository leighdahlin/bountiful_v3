import { gql } from '@apollo/client';

//Query one user and all their associated items for sale:
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        _id
        first_name
        last_name
        username
        location
        email
      items {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
      }
    }
  }
`;

//Query a single user for the seller profile:
export const QUERY_SINGLE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        _id
        username
        location
        email
      }
    }
  }
`;

//Query all items for sale:
export const QUERY_ITEMS = gql`
  query getItems {
    items {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
        user
        category
    }
  }
`;

//Query a single item:
export const QUERY_SINGLE_ITEM = gql`
  query getSingleItem($itemId: ID!) {
    item(itemId: $itemId) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
        user
        category
      }
    }
  }
`;

//Query items based on category:
export const QUERY_CAT_ITEMS = gql`
  query getItems($category: ID) {
    items(category: $category) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
        user
      category {
        _id
      }
    }
  }
`;

//Query all the categories:
export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      category_name
    }
  }
`;
