require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import client from "./client";

import { getUser } from "./users/users.utils";
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));
