import { Request, Response } from "express";
import { slots } from "../models/slots";
import { doctors } from "../models/doctors";
import { user } from "../models/users";

export const createSlots=async(req:Request,res:Response)=>{
    console.log(req.body)
    try {
        const resp = await slots.create(req.body);
    res.status(201).json(resp)
    } catch (error) {
        // console.log(error);
        
        res.status(500).json(error)
    }
}
export const getSlots=async(req:Request,res:Response)=>{
    const id=req.query.doctorId;
    try {
        const resp=await slots.findAll({
            include:[{
                model:doctors,
                where:{
                    Id:id
                },
                include:[{
                    model:user
                }]
            }]
        })  
        res.status(200).json(resp)
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:"Something went wrong"}) 
    }
  
}