import * as jwt from "jsonwebtoken";
import { Resolver } from "../type";

export const getUser = async (token, client) => {
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
      const user = await client.user.findUnique({
        where: { id: decoded["id"] },
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in",
      };
    }
    return ourResolver(root, args, context, info);
  };
