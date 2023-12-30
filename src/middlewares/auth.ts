import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { patient } from "../models/patient";
import { user } from "../models/users";
import { doctors } from "../models/doctors";
import { speciality } from "../models/speciality";
import { hospital } from "../models/hospital";
export const auth = async (req:Request, res:Response, next:NextFunction) => {
 
  // console.log(req.headers.authorization);
  const role = req.params.role;
  // console.log(role);
  try {
    if(req.headers.authorization){
        const payload = verifyToken(req.headers.authorization);
        // console.log(payload);
    let userData;
    if (role === "patient")     {
      userData = await patient.findOne({
        include: {
          model: user,
          where: {
            Id: payload.Id,
          },
        },
      });
    }
    else if (role === "doctor") {
      userData = await doctors.findOne({
        include: [{
          model: user,
          where: {
            Id: payload.Id,
          },
        },
        {
          model: speciality,
        },
        {
          model: hospital,
        },
      ]
      });
    } else {
      userData = await hospital.findOne({
        where: {
          Id: payload.Id,
        },
      });
    }
    if (!userData) {
      throw new Error("User not found");
    } else {
      res.locals.user = userData;
      next();
    }
}
else{
  throw new Error("User not found");
}
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};