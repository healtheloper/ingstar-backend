import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.PRIVATE_KEY);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in",
      };
    }
    return ourResolver(root, args, context, info);
  };
