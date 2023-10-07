const { generateOtp } = require("../utils/generateOtp")
const { sendOtp } = require("../utils/sendMail")

const getOtpAgain=async(req,res)=>
{
  const otp=generateOtp()
  await sendOtp(otp,resp)
  const token = otpToken(otp)
  res.send({token:token})
}
module.exports={getOtpAgain}