import { Request, Response } from "express";
import { patient } from "../models/patient";
import { user } from "../models/users";



export const registerPatients=async(req:Request,res:Response)=>{
console.log(req.body)
req.body.role="patient"
try {
    const resp = await user.create(req.body);
     await patient.create({
        userId:resp.Id
     })
console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}

}
