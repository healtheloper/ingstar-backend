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
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): CoreOutput
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
