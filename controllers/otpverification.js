const { otpModel } = require("../models/otp");
const { getToken, verifyToken } = require("../utils/jwt");

const otpVerification = async (req, res) => {
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
module.exports = { otpVerification };
