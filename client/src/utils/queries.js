import { gql } from "@apollo/client";
export const COMMENTS_QUERY = gql`
query GetComments {
  getComments {
    name
    email
    comment
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