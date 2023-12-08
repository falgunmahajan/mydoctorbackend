import { Op } from "sequelize";
import { speciality, specialityAttributes } from "../models/speciality";
import { Request, Response } from "express";

export const getSpecialities=async(req:Request,res:Response)=>{
const name=req.query.name as string
let specialities:Array<Object>;

if(!name){
     specialities=await speciality.findAll()
}
else{
    specialities=await speciality.findAll({
    where:{
        name:{
            [Op.iRegexp]:name
        }
    }})
}

res.status(200).json({
    total:specialities.length,
    data:specialities
})
}


export const createSpecialities=async (req:Request, res:Response) => {
    const resp = req.body.map(async (item:specialityAttributes) => await speciality.create(item));
    res.json(resp);
  }