import { Request, Response } from "express";
import { user } from "../models/users";
import { hospital } from "../models/hospital";
import { matchedPassword } from "../utils/password";
import { generate } from "otp-generator"
import { sendOtp } from "../utils/sendMail";
import { otpToken } from "../utils/jwt";
// const { getToken, otpToken } = require("../utils/jwt");
// const { matchedPassword } = require("../utils/password");

// const { sendOtp } = require("../utils/sendMail");

const authentication = async (req:Request, res:Response) => {
  // console.log(req.body);
  let resp;
  if(req.body.email){
    resp =
    (await user.findOne({
      where: {
        email: req.body.email,
      },
    })) 
    ||
    (await hospital.findOne({
      where: {
        email: req.body.email,
      },
    }));
  }
  if(req.body.contactNumber){
    resp =
    (await user.findOne({
      where: {
        contactNumber: req.body.contactNumber,
      },
    })) 
    ||
    (await hospital.findOne({
      where: {
        contactNumber: req.body.contactNumber,
      },
    }));
  }
  
    // console.log(resp)
  if (resp && matchedPassword(req.body.password,resp.password)) {
    
    const otp=  generate(6,{
      lowerCaseAlphabets :false,
      upperCaseAlphabets :false,
      specialChars:false
    })
  //  console.log(typeof otp)
    await sendOtp(otp,resp)
    const token = otpToken(otp)
    res.status(201).json({otpToken:token,user:resp});
  } else {
    res
      .status(401)
      .json({
        name: "NotAuthenticated",
        message: "Invalid login",
        code: 401,
        className: "not-authenticated",
        errors: {},
      });
  }
};
export{ authentication };
