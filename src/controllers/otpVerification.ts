import { Request, Response } from "express";
import { getToken, verifyToken } from "../utils/jwt";



export const otpVerification = async (req:Request, res:Response) => {
  console.log(req.body);
  try {
    const tokenPayload = verifyToken(req.body.user.otpToken);
    const orgOtp = tokenPayload.otp;
    console.log(orgOtp)
    if (orgOtp == req.body.otp) {
      const token = getToken(req.body.user.user);
      res.status(201).json({ accessToken: token, user: req.body.user.user });
    } else {
      res.status(401).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Invalid OTP" });
  }
 
};
