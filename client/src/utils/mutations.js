import { gql } from "@apollo/client";
export const COMMENT_MUTATION = gql`
mutation Mutation($name: String!, $email: String!, $comment: String!) {
    insertComment(name: $name, email: $email, comment: $comment) {
        name
        email
        comment
    }
  }
`;
export const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        firstName
        email
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
        user {
            _id
            email
            firstName
            lastName
        }
    }
  }
  `