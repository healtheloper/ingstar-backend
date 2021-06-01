import { gql } from "apollo-server-core";

export default gql`
  type FollowResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followUser(username: String!): FollowResult!
  }
`;
