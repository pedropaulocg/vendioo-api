import User from "../../models/User";

import {
  createToken,
} from "../../helpers/createToken";
import { HTTPError } from "../../middlewares/error_handler";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

const AuthUserService = async ({
  email,
  password
}: Request): Promise<Response> => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new HTTPError(401, "Email inválido");
  }
  
  if (!(await user.checkPassword(password))) {
    throw new HTTPError(401, "Senha inválida");
  }
  

  const token = createToken(user);

  return {
    user,
    token,
  };
};

export default AuthUserService;
