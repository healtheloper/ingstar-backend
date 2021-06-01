import { gql } from "apollo-server";

export default gql`
  type CoreOutput {
    ok: Boolean!
    error: String
  }
  type User {
    id: Int!
    firstName: String
    lastName: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`;
