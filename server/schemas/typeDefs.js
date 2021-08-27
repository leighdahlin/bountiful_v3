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
    item_quantity: Number
    item_unit: String
    item_price: Number
    cat_name: String
    users: [User]!
    categories: [Category]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    categories: [Catergory]
    items(username: String): [Item]
    item(itemID:ID!): Item
  }

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(thoughtText: String!, thoughtAuthor: String!): Thought
//     addComment(
//       thoughtId: ID!
//       commentText: String!
//       commentAuthor: String!
//     ): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
`;

module.exports = typeDefs;