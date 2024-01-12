import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { patient } from "../models/patient";
import { user } from "../models/users";

export const paymentAuth = async (req:Request, res:Response, next:NextFunction) => {
 
    try {
      if(req.headers.authorization){
          const payload = verifyToken(req.headers.authorization);
          // console.log(payload);
      let  userData = await patient.findOne({
          include: {
            model: user,
            where: {
              Id: payload.Id,
            },
          },
        });
      
      
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
    
      res.status(401).json({ message: "Unauthorized User" });
    }
  };