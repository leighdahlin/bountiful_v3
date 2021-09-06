import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($first_name: String!, $last_name: String!, $location: String!, $username: String!, $email: String!, $password: String!) {
    addUser(first_name: $first_name, last_name: $last_name, location:$location, username:$username, email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        username
        location
        email
        password
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($first_name: String!, $last_name: String!, $location: String!, $username: String!, $email: String!, $password: String!) {
    updateUser(first_name: $first_name, last_name: $last_name, location:$location, username:$username, email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        username
        location
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($title: String!, $item_name: String!, $item_description: String!, $item_quantity: Float!, $item_unit: String!, $item_price: Float, $cat_name: String!) {
    addItem(title: $title, item_name: $item_name, item_description: $item_description,
      item_quantity: $item_quantity, item_unit: $item_unit, item_price: $item_price, cat_name: $cat_name) {
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
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($title: String!, $item_name: String!, $item_description: String!, $item_quantity: Float!, $item_unit: String!, $item_price: Float, $cat_name: String!) {
    updateItem(title: $title, item_name: $item_name, item_description: $item_description,
      item_quantity: $item_quantity, item_unit: $item_unit, item_price: $item_price, cat_name: $cat_name) {
      item {
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