import { userAttributes } from "../models/users";

const jwt = require("jsonwebtoken");
const getToken=(resp:userAttributes)=>{
   return jwt.sign(
        {
          Id: resp.Id,
          email: resp.email
        },
        process.env.SECRETKEY, { expiresIn: '2d' }
      );
}
const verifyToken=(token:string)=>{
  return jwt.verify(token,process.env.SECRETKEY)
}
const otpToken=(otp:string)=>{
  return jwt.sign({
    otp:otp
  },process.env.SECRETKEY, { expiresIn: '3d' })
}
export{getToken,verifyToken,otpToken}