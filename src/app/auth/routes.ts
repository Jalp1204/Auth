import express from "express";
import type {Router} from "express";
import AuthController from "./controller.js";
import { authenticationMiddleware ,restrictToAuthenticatedUser } from "../middleware/authmiddleware.js";


const authControllerInstance = new AuthController();

export const authRouter: Router = express.Router();

authRouter.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
    return res.json({
        message: "server is working"
    });
});

authRouter.post("/signup", authControllerInstance.handleSignup.bind(authControllerInstance));
authRouter.post("/signin", authControllerInstance.handleSignin.bind(authControllerInstance));
authRouter.get("/me", authenticationMiddleware(),restrictToAuthenticatedUser() , authControllerInstance.handleMe.bind(authControllerInstance)); 

