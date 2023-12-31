const { hospital } = require("../models/hospital");
const { user } = require("../models/users");
const { getToken, otpToken } = require("../utils/jwt");
const otpGenerator=require("otp-generator")
const { matchedPassword } = require("../utils/password");
const { otpModel } = require("../models/otp");
const { sendOtp } = require("../utils/sendMail");

const authentication = async (req, res) => {
  console.log(req.body);
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
  
    console.log(resp)
  if (resp && matchedPassword(req.body.password,resp.password)) {
    
    const otp=  otpGenerator.generate(6,{
      lowerCaseAlphabets :false,
      upperCaseAlphabets :false,
      specialChars:false
    })
   
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
module.exports = { authentication };
