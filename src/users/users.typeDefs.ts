import { gql } from "apollo-server";

export default gql`
  type FollowUserResult {
    ok: Boolean!
    users: [User]
    totalPages: Int!
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
    following(page: Int): FollowUserResult!
    followers(page: Int): FollowUserResult!
  }
`;
