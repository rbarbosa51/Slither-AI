import { gql } from "@apollo/client";
export const COMMENT_MUTATION = gql`
mutation Mutation($name: String!, $email: String!, $comment: String!) {
    insertComment(name: $name, email: $email, comment: $comment) {
        comment
        email
        name
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