import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../type";

export const getUser = async (token) => {
  try {
    const verifiedToken: any = await jwt.verify(token, process.env.PRIVATE_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
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
