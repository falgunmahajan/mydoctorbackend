
import { Request, Response } from "express";
import { patient } from "../models/patient";
import { updateDoctorProfile, updateProfessional, updateSpecialities, updateUser } from "../utils/updateData";
import { user } from "../models/users";

export const updateProfile = async (req:Request, res:Response) => {
  // console.log(req)
  console.log(req.body);
  if(req.file){
    req.body.image=`/assests/images/uploads/${req.file.originalname}`
  }
  const role = req.params.role;
  console.log(role);
  // console.log(req.body)
 
  if (role == "patient") {
    try {
      if(req.body.firstName || req.body.lastName || req.body.contactNumber ||req.body.email || req.body.gender){
        updateUser(req.body)
      }
        const resp = await patient.update(
            req.body,
             {
               where: {
                 userId: req.body.userId,
               },
             }
           );
           res.status(201).json(resp)  
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
    
  }
  if (role == "doctor") {
    // console.log("data",req.body)
    if(req.body.languages){
      req.body.languages=JSON.parse(req.body.languages)
    }
    if(req.body.specialities){
      try {
       await updateSpecialities(req.body)
       await updateDoctorProfile(req.body)
       res.status(201).json({message:"Your data is updated"})  
      } catch (error) {
        res.status(500).json({message:"Something went wrong"})
      }
    }
   else if(req.body.profile){
    console.log("51")
     try {
      await updateProfessional(req.body)
      res.status(201).json({message:"Your data is updated"}) 
     } catch (error) {
      res.status(500).json({message:"Something went wrong"})
     }
    
    }
else{
  try {
    if(req.body.firstName || req.body.lastName || req.body.contactNumber ||req.body.email || req.body.gender){
      updateUser(req.body)
    }
    await updateDoctorProfile(req.body)
    res.status(201).json({message:"Your data is updated"}) 
  } catch (error) {
    // console.log(error)
    res.status(500).json({message:"Something went wrong"})
  }
}
   
    
  }

};
