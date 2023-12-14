import { Request, Response } from "express";
import { hospital } from "../models/hospital";

export const getHospitals=async(req:Request,res:Response)=>{

   const hospitals=await hospital.findAll({})

res.json({
    total:hospitals.length,
    data:hospitals
})
}


export const registerHospitals=async(req:Request,res:Response)=>{
// console.log(req.body)
try {
    const resp = await hospital.create(req.body)
// console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}

}

// export const getHospitalById=async(req:Request,res:Response)=>{
//     const hospitalId=req.params.id;
//     try {
//         const resp=await hospital.findOne({
//             where:{
//                 Id:hospitalId
//             }
//         })
//         if(resp){
//             res.status(200).json(resp)
//         }
//         else{
//             res.status(400).json({msg:"Not Found"}) 
//         }
        
//     } catch (error) {
//         res.status(400).json({msg:"Not Found"})
//     }
// }
