//Alex this is placeholder text

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Comment {
    name: String!
    email: String!
    comment: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user: User
    getComments: [Comment]
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    insertComment(name: String!, email: String!, comment: String!): Comment
  }

  
`;

module.exports = typeDefs;
