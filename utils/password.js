const bcrypt=require("bcryptjs");
const getHashPassword=(pswd)=>{
   const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pswd, salt)
return hash;
}


const matchedPassword=(pswd,storedPswd)=>
{
  return  bcrypt.compareSync(pswd, storedPswd); 
}
module.exports={getHashPassword,matchedPassword}