

const { hospital } = require("../models/hospital");
const { user } = require("../models/users");

const isUnique=async(req,res)=>{
   
    const role=req.params.role
    console.log(role)
    const email=req.query.email;
    const model=role==="hospital"?hospital:user
    console.log(model)
    const contactNumber=req.query.contactNumber
    console.log(email,contactNumber)
    let resp;
    if(email){
        resp=await model.findOne({where:{
            email:email
        }})
    }
    if(contactNumber){
         resp=await model.findOne({where:{
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