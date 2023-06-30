import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

import authConfig from "../config/authConfig";
import { HTTPError } from "./error_handler";

interface TokenPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
  userId: number | string;
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    throw new HTTPError(403, "Token não fornecido");
  }

  const [, token] = headerToken.split(" ");

  try {
    const decoded = verify(token, authConfig.secret)
    const { userId } = decoded as TokenPayload;

    req.user = {
      userId
    }
  } catch (e) {
    console.log(e);
    throw new HTTPError(403, "Token invalido. Faça o login novamente");
  }

  return next()
}

export default auth