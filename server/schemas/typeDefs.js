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
    user: User
    getComments: [Comment]
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    insertComment(name: String!, email: String!, comment: String!): Comment
  }

  
`;

module.exports = typeDefs;
