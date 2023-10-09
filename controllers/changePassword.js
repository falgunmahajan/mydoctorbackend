const { user } = require("../models/users")
const { matchedPassword } = require("../utils/password")

const changePassword=async(req,res)=>{
    console.log(req.body)
    try {
        const userData=await user.findOne({where:{
            Id:req.body.id,
        }})
        if(matchedPassword(req.body.oldPassword,userData.password)){
            await user.update({ password:req.body.newPassword }, {
                where: {
                    Id:req.body.id,
                }
              });
              res.status(201).json({message:"Your Password is Successfully Changed"})
        }
        else{
            res.status(401).json({message:"Your Old Password is Wrong"})
        }
    } catch (error) {
        
    }
    
}
module.exports={changePassword}