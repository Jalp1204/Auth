import type { Request , Response } from "express";
import {signupSchema , signinPayloadModel} from "./models.js";
import { db } from "../../db/index.js"; 
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

class AuthController {
    public async handleSignup(req: Request, res: Response) {
        const result = await signupSchema.safeParseAsync(req.body);
        if (!result.success) {
            return res.status(400).json({ message: "Body validation failed" , errors: result.error.issues});
        }
        const {firstName, lastName, email, password} = result.data;

        const userEmailResult=await db.select().from(userTable).where(eq(userTable.email,email));

        if(userEmailResult.length>0){
            return res.status(400).json({ message: `user with email ${email} already exists` , errors: 'duplicate entry'});
        }

        const salt=randomBytes(32).toString('hex')

        const hash=createHmac('sha256',salt).update(password).digest('hex');

        const [dbresult] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password:hash,
            salt,

        }).returning({id : userTable.id});

        return res.status(201).json({message: "user has been created", data: {id: dbresult?.id}})


    }

    public async handleSignin(req: Request, res: Response){
        const validationSignin = await signinPayloadModel.safeParseAsync(req.body);
        if (!validationSignin.success) {
            return res.status(400).json({ message: "Body validation failed" , errors: validationSignin.error.issues});
        }
        const {email, password} = validationSignin.data;

        const [userSelect] = await db.select().from(userTable).where(eq(userTable.email,email));
        if(!userSelect){
            return res.status(404).json({ message: `user eith email ${email} does not exists` });
        }

        const salt= userSelect.salt!;
        const hash=createHmac('sha256',salt).update(password).digest('hex');

        if(userSelect.password!=hash){
            return res.status(400).json({ message: "invalid credentials"});
        }

        //create token
        return res.json({message: 'signin success', data: {token: 1}})
    

    }
}





export default AuthController;

