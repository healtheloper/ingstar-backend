import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existUser = await client.user.findFirst({
          where: { OR: [{ email }, { username }] },
        });
        if (existUser) {
          console.log("error");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
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
    },
  },
};
