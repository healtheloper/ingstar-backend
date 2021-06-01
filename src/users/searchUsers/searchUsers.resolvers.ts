import { Resolvers } from "../../type";
const USER_PER_PAGE = 5;

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page }, { client }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: USER_PER_PAGE,
        skip: (page - 1) * USER_PER_PAGE,
      });
      return users;
    },
  },
};
export default resolvers;
