import type { NextFunction,Request,Response } from "express";
import type {ZodType} from "zod";

export function validateBody(schema: ZodType){
    return(
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
            error:"Invalid request data",
            details: result.error.flatten().fieldErrors,
            });
        }

        req.body = result.data;
        next();
    };
}