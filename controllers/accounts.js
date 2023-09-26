const { Op } = require("sequelize");
const {  patient } = require("../models/patient");

const isUnique=async(req,res)=>{
    const email=req.query.email;
    const contactNumber=req.query.contactNumber
    console.log(email,contactNumber)
    let resp;
    if(email){
        resp=await patient.findOne({where:{
            email:email
        }})
    }
    if(contactNumber){
         resp=await patient.findOne({where:{
            contactNumber:contactNumber
        }})
    }
    if(resp)
    {
        res.status(433).json({
                name: "account exists",
                message: `account already exists for ${email?'email':"contactNumber"}: ${req.query.email||req.query.contactNumber}`,
                code: 433,
                className: "AccountExists",
                errors: {}
        })
    }
    else{
        res.status(200).json([])
    }
}
module.exports={isUnique}