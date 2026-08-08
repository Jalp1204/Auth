import express from "express";
import type {Express} from "express";


export function createApp(): Express {
    const app=express();



    app.get("/", (req,res) => {
        return res.json({message:"hello world"});
    });

    return app;
}


