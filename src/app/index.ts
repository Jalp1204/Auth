import express from "express";
import type {Express} from "express";
import { authRouter } from "./auth/routes.js";
import { authenticationMiddleware } from "./middleware/authmiddleware.js";


export function createApp(): Express {
    const app=express();

    app.use(express.json());
    app.use(authenticationMiddleware());




    app.get("/", (req,res) => {
        return res.json({message:"hello world"});
    });

    app.use("/auth",authRouter);

    return app;
}


