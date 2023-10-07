const { otpModel } = require("../models/otp");
const { getToken, verifyToken } = require("../utils/jwt");

const otpVerification = async (req, res) => {
  console.log(req.body);
  try {
    const tokenPayload = verifyToken(req.body.user.otpToken);
    const orgOtp = tokenPayload.otp;
    console.log(orgOtp)
    if (orgOtp == req.body.otp) {
      const token = getToken(req.body.user);
      res.status(201).json({ accessToken: token, user: req.body.user });
    } else {
      res.status(401).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Invalid OTP" });
  }
 
  // const userId=req.body.user.Id;
  // const otp=req.body.otp;
  // const resp=await otpModel.findOne({where:{
  //     userId:userId,
  //     otp:otp
  // }})
  // if(resp){
  //     const token = getToken(req.body.user)
  //     res.status(201).json({accessToken:token,user:req.body.user});
  // }
  // else{
  //     res.status(401).json({msg:"Invalid OTP"});
  // }
};
module.exports = { otpVerification };
