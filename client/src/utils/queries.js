import { gql } from "@apollo/client";
export const COMMENTS_QUERY = gql`
query Query {
    getComments {
      comment
      email
      name
    }
  }
`
export const USER_QUERY = gql`
  query Query {
    user {
      _id
      email
      firstName
      lastName
    }
  }
  `