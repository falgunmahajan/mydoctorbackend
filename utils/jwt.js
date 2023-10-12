const jwt = require("jsonwebtoken");
const getToken=(resp)=>{
   return jwt.sign(
        {
          Id: resp.Id,
          email: resp.email
        },
        process.env.SECRETKEY, { expiresIn: '2d' }
      );
}
const verifyToken=(token)=>{
  return jwt.verify(token,process.env.SECRETKEY)
}
const otpToken=(otp)=>{
  return jwt.sign({
    otp:otp
  },process.env.SECRETKEY, { expiresIn: '3d' })
}
module.exports={getToken,verifyToken,otpToken}