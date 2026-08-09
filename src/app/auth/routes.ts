import express from "express";
import type {Router} from "express";
import AuthController from "./controller.js";


const authControllerInstance = new AuthController();

export const authRouter: Router = express.Router();



authRouter.post("/signup", authControllerInstance.handleSignup.bind(authControllerInstance));
