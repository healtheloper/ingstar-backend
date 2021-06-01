import * as bcrypt from "bcrypt";
import { Resolvers } from "../../type";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { loggedInUser, client }
      ) => {
        try {
          let hashPassword = undefined;
          if (newPassword) {
            hashPassword = await bcrypt.hash(newPassword, 10);
          }
          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              firstName,
              lastName,
              password: hashPassword,
              username,
              email,
            },
          });
          if (updatedUser.id) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: "Count Not Update User",
            };
          }
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
