import { Request, Response } from "express"
import CreateUserService from "../services/User/CreateUserService";



export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const user = await CreateUserService({email, password, name});

  return res.status(200).json(user)
}