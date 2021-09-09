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
  mutation updateUser($first_name: String!, $last_name: String!, $location: String!, $username: String!, $email: String!) {
    updateUser(first_name: $first_name, last_name: $last_name, location:$location, username:$username, email: $email) {
        _id
        first_name
        last_name
        username
        location
        email
        password
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
  mutation addItem($title: String!, $item_name: String!, $item_description: String!, $item_quantity: Float!, $item_unit: String!, $item_price: Float, $category_name: String!, $username:String!) {
    addItem(title: $title, item_name: $item_name, item_description: $item_description,
      item_quantity: $item_quantity, item_unit: $item_unit, item_price: $item_price, category_name: $category_name, username:$username) {
          _id
          title
          item_name
          item_description
          item_quantity
          item_unit
          item_price
          category_name
          user{
            _id
            username
          } 
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($_id: ID!, $title: String!, $item_name: String!, $item_description: String!, $item_quantity: Float!, $item_unit: String!, $item_price: Float, $category_name: String!) {
    updateItem(_id: $_id, title: $title, item_name: $item_name, item_description: $item_description,
      item_quantity: $item_quantity, item_unit: $item_unit, item_price: $item_price, category_name: $category_name) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        category_name
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($_id: ID!) {
    removeItem(_id:$_id) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        category_name
        createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($userId: ID!, $title: String!, $body: String!) {
    createReview(userId: $userId, title: $title, body: $body) {
      _id
      title
      body
      createdAt
      reviews {
        _id
        title
        body
      }
    }
  }
`;
