import { hospitalAttributes } from "../models/hospital";
import { userAttributes } from "../models/users";

const nodemailer = require("nodemailer");
export const sendOtp = async (otp:string, resp:userAttributes|hospitalAttributes)=> {
 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const message = await transporter.sendMail({
    from: "mydoctor@gmail.com", // sender address
    to: resp.email, // list of receivers
    subject: "OTP for Verification", // Subject line
    html: `Your OTP for Verification is<br><h1>${otp}</h1><br>Do not share this code with anyone. <br>This code expires in 5 mins.`, // html body
  });
};
