import {z} from "zod";


export const signupSchema = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().nullable().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
})