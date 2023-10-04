const jwt = require("jsonwebtoken");
const getToken=(resp)=>{
   return jwt.sign(
        {
          Id: resp.Id,
          email: resp.email,
        },
        process.env.SECRETKEY, { expiresIn: '30d' }
      );
}
const verifyToken=(token)=>{
  return jwt.verify(token,process.env.SECRETKEY)
}
module.exports={getToken,verifyToken}