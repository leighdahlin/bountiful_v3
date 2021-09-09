const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    username: String
    location: String
    email: String
    password: String
    items: [Item]
  }

  type Category {
    _id: ID
    category_name: String
  }

  type Item {
    _id: ID
    title: String
    item_name: String
    item_description: String
    item_quantity: Float
    item_unit: String
    item_price: Float
    category_name: String
    createdAt: String
    user: User
    reviews: [Review]!
  }

  type Review{
    _id: ID!
    createdAt: String!
    user: User
    body: String!
  }

  input ItemData {
    _id: ID
    title: String
    item_name: String
    item_description: String
    item_quantity: Float
    item_unit: String
    item_price: Float
    cat_name: String
  }

  type itemResponse{
    success: Boolean
    item: Item
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    users: [User]
    user: User
    seller(username:String): User
    categories: [Category]
    items: [Item]
    itemscat(category_name:String):[Item]
    itemsuser(username:String): [Item]
    item(_id:ID!): Item
    getReviews: [Review]
    getReview(reviewId: ID!): Review
    
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!, location: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(first_name: String!, last_name: String!, location: String!, username: String!, email: String!): User
    createReview(body: String!, username: String!, createdAt: String!): Review
    deleteReview(_id: ID!): User!

    addItem(
      _id: ID
      title: String
      item_name: String
      item_description: String
      item_quantity: Float
      item_unit: String
      item_price: Float
      category_name: String
      username: String
    ): Item
    updateItem(
      _id: ID
      title: String
      item_name: String
      item_description: String
      item_quantity: Float
      item_unit: String
      item_price: Float
      category_name: String
    ): Item
    removeItem( _id: ID!): Item

  }
`;

module.exports = typeDefs;