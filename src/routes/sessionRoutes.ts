import { Router } from "express";
import * as SessionController from "../controllers/SessionController";

const authRoutes = Router();

authRoutes.post("/login", SessionController.login);


export default authRoutes;
