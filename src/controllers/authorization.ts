import { Request, Response } from "express"

const authorization=async(req:Request,res:Response)=>{
    res.json(res.locals.user)
    }
    export{authorization}