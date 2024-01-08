import { Request, Response } from "express";
import { slots } from "../models/slots";
import { doctors } from "../models/doctors";
import { user } from "../models/users";
import { Op } from "sequelize";

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
    const date=req.query.date as string;
    const startDate=req.query.start as string;
    console.log(startDate)
if(date){
    const dateStr=new Date(date)
    const startTime=new Date(dateStr.getFullYear(),dateStr.getMonth(),dateStr.getDate())
    const endTime=new Date(dateStr.getFullYear(),dateStr.getMonth(),dateStr.getDate()+1)
    try {
        const resp=await slots.findAll({
            where:{
                startTime:{
                    [Op.gte]:startTime.toISOString(),
                    [Op.lt]:endTime.toISOString()
                }
            },
            include:[{
                model:doctors,
                where:{
                    Id:id,
                   
                },
                include:[{
                    model:user
                }]
            }]
        })  
        console.log(resp)
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"}) 
    }
}
if(startDate){
    try {
        const resp=await slots.findAll({
            order:[["startTime","ASC"]],
            where:{
                startTime:{
                    [Op.gte]:startDate,
                  
                }
            },
            include:[{
                model:doctors,
                where:{
                    Id:id,
                   
                },
                include:[{
                    model:user
                }]
            }]
        })  
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"}) 
    }
}
   
  
}
export const deleteSlots=async(req:Request,res:Response)=>{
    const slotsId=req.query.slotsId as string;
    try {
        const resp=await slots.destroy({
            where:{
                  Id:slotsId,
            }
        })
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"}) 
    }
  
}