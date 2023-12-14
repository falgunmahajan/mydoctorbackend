import { Request, Response } from "express"

const authorization=async(req:Request,res:Response)=>{
    res.status(200).json(res.locals.user)
    }
    export{authorization}