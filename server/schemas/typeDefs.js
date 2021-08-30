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
    cat_name: String
    user: User
    category: Category
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
    user: User
    category: Category
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
    user(userId: ID!, email: String!): User
    categories: [Catergory]
    items(category:ID, username: String): [Item]
    item(_id:ID!): Item
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!, location: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(first_name: String!, last_name: String!, location: String!, username: String!, email: String!, password: String!): User

    createItem(item:ItemData): itemResponse
    updateItem(
      itemId: ID
      title: String
      item_name: String
      item_description: String
      item_quantity: Float
      item_unit: String
      item_price: Float
      cat_name: String
      category: Category
    ): Item
    removeItem( itemId: ID!): Item

    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;