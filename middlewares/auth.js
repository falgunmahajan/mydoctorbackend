const { hospital } = require("../models/hospital")
const { user } = require("../models/users")
const { verifyToken } = require("../utils/jwt")

const auth=async(req,res,next)=>{
    console.log(req.headers.authorization)
    try {
        const payload=verifyToken(req.headers.authorization)
        console.log(payload)
        const userData=await user.findOne({where:{
          Id:payload.Id
        }})|| await hospital.findOne({
            where:{
                Id:payload.Id
            }
        })
        if(!userData){
            throw new Error("User not found")
        }
        else{
            req.user=userData;
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Unauthorized User"})
    }
}
module.exports={auth}