import { sign } from "jsonwebtoken";
import authConfig from "../config/authConfig";
import User from "../models/User";


export const createToken = (user: User): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      username: user.name,
      userId: user.id
    },
    secret,
    {
      expiresIn
    }
  );
};