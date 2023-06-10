import { Request, Response, NextFunction } from "express";
import AuthUserService from "../services/User/AuthUserService";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Verificar as credenciais e obter o token e o usuário
    const { token, user } = await AuthUserService({
      email,
      password
    });

    const params = {
      token,
      username: user.name,
      email: user.email,
      userId: user.id,
    };

    res.status(200).json(params);
  } catch (error) {
    next(error); 
  }
};
