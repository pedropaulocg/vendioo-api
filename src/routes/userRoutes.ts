import { Router } from "express"
import * as userController from "../controllers/UserController"
import auth from "../middlewares/auth";

const userRoutes = Router();

userRoutes.post("/users", auth, userController.createUser)

export default userRoutes
