import { Request, Response } from "express";
import { doctors } from "../models/doctors";
import { user } from "../models/users";
import { speciality } from "../models/speciality";
import { hospital } from "../models/hospital";
export const getDoctors=async(req:Request,res:Response)=>{
    try {
        const resp= await doctors.findAll({
            include: [{
              model: user,
            },
            {
              model: speciality,
            },
            {
              model: hospital,
            },
          ]
          });
          res.status(200).json(resp)
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
   
}


export const registerDoctors=async(req:Request,res:Response)=>{
// console.log(req.body)
req.body.role="doctor";
try {
    const resp = await user.create(req.body)
    
    await doctors.create({
        userId:resp.Id
     })
// console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}
}
