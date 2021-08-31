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