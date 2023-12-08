import { Request, Response } from "express"
import "./src/types/express/index.d.ts"
const authorization=async(req:Request,res:Response)=>{
    res.json(req.user)
    }
    export{authorization}