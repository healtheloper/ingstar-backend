import { gql } from "apollo-server-core";

export default gql`
  type UnfollowResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowResult!
  }
`;
