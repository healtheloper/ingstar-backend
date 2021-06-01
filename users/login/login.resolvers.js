import jwt from "jsonwebtoken";
import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await client.user.findUnique({ where: { email } });
        if (!user) {
          return {
            ok: false,
            error: "User not found by this email",
          };
        }
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
          return {
            ok: false,
            error: "Wrong Password",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
        return {
          ok: true,
          token,
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
