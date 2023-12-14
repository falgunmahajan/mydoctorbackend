import { Request, Response } from "express"
import { user, userAttributes } from "../models/users";
import { matchedPassword } from "../utils/password";

const changePassword=async(req:Request,res:Response)=>{
    // console.log(req.body)
    try {
        const userData=await user.findOne({where:{
            Id:req.body.id,
        }})
        if(userData){
            if(matchedPassword(req.body.oldPassword,userData.password)){
                await user.update({ password:req.body.newPassword }, {
                    where: {
                        Id:req.body.id,
                    }
                  });
                  res.status(201).json({message:"Your Password is Successfully Changed"})
            }
            else{
                res.status(401).json({message:"Your Old Password is Wrong"})
            }
        }
       
    } catch (error) {
        
    }
    
}
export{changePassword}