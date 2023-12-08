
import bcrypt from "bcryptjs"
const getHashPassword=(pswd:string):string=>{
   const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pswd, salt)
return hash;
}


const matchedPassword=(pswd:string,storedPswd:string):boolean=>
{
  return  bcrypt.compareSync(pswd, storedPswd); 
}
export{getHashPassword,matchedPassword}