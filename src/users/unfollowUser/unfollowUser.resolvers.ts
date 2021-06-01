import { Resolvers } from "../../type";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        try {
          const userExsits = await client.user.findUnique({
            where: { username },
          });
          if (!userExsits) {
            return {
              ok: false,
              error: "That user does not exists",
            };
          }
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error,
          };
        }
      }
    ),
  },
};

export default resolvers;
