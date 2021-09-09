import { gql } from '@apollo/client';

//Query one user and all their associated items for sale:
export const QUERY_SELLER = gql`
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
  query singleuser($username: String!) {
    user(username: $username) {
        _id
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
          category_name
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
        user{
          _id
          username
          location
        }
        category{
          _id
          category_name
        }
    }
  }
`;

//Query all items for sale for one user:
export const QUERY_ITEMS_USER = gql`
  query getItemsUser ($username:String!) { 
    itemsuser (username:$username) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
        user{
          _id
          username
          location
        }
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
        user{
          _id
        }
        category{
          _id
          category_name
        }
      }
    }
`;

//Query items based on category:
export const QUERY_CAT_ITEMS = gql`
  query getItems($category: ID) {
    itemscat(category: $category) {
        _id
        title
        item_name
        item_description
        item_quantity
        item_unit
        item_price
        cat_name
        user{
          _id
        }
      category {
        _id
        category_name
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

//Query all reviews:
export const QUERY_REVIEWS = gql`
  query getReviews {
    reviews {
      _id
      title
      body
      createdAt
      reviewee
      rating
    }
  }
`;

//Query a single review:
export const QUERY_SINGLE_REVIEW = gql`
  query getSingleReview($reviewId: ID!) {
    review(reviewId: $reviewId) {
        _id
        title
        body
        createdAt
        reviewee
        rating
        user{
          _id
        }
      }
    }
`;