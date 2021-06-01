import { Resolvers } from "../../type";
const USER_PER_PAGE = 5;
const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({ where: { username } }),
  },
  User: {
    followers: async ({ username }, { page }, { client }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ take: USER_PER_PAGE, skip: (page - 1) * USER_PER_PAGE });
      const totalFollwers = await client.user.count({
        where: { following: { some: { username } } },
      });
      const totalPages = Math.ceil(totalFollwers / USER_PER_PAGE);
      if (page > totalPages && totalPages !== 0) {
        return {
          ok: false,
          totalPages,
          error: "This Page Count Not Be Found",
        };
      }
      return {
        ok: true,
        users: followers,
        totalPages,
      };
    },
    following: async ({ username }, { page }, { client }) => {
      const following = await client.user
        .findUnique({ where: { username } })
        .following({ take: USER_PER_PAGE, skip: (page - 1) * USER_PER_PAGE });
      const totalFollwing = await client.user.count({
        where: { followers: { some: { username } } },
      });
      const totalPages = Math.ceil(totalFollwing / USER_PER_PAGE);
      if (page > totalPages && totalPages !== 0) {
        return {
          ok: false,
          totalPages,
          error: "This Page Count Not Be Found",
        };
      }
      return {
        ok: true,
        users: following,
        totalPages,
      };
    },
  },
};

export default resolvers;
