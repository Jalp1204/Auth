import type { Request , Response , NextFunction } from "express";
import { verifyUserToken } from "../auth/utils/tokens.js";



export function authenticationMiddleware() {
    return function(req : Request ,res : Response , next : NextFunction){
        const header=req.header('authorization');
        if(!header){
            return next();
        }
        if(!header?.toLowerCase().startsWith('bearer')){
            return res.status(400).json("error: authorization header must start with bearer ")
        }

        const token=header.split(' ')[1];

        if(!token) return res.status(400).json("error: authorization header must start with bearer and followed")

        const user = verifyUserToken(token);

        if (!user) return res.status(401).json({error: "Invalid or expired token"});
    
        //@ts-ignore
        req.user=user 

        next();
    }
}


export function restrictToAuthenticatedUser(){
    return function(req : Request ,res : Response , next : NextFunction){
        //@ts-ignore
        if(!req.user) return res.status(401).json({error: `authentication Required`})
        return next()
    }
}