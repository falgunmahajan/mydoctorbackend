const {  doctor } = require("../models/patient")
// const { getHashPassword } = require("../utils/password")

const registerDoctors=async(req,res)=>{
console.log(req.body)
req.body.role="doctors";
const resp = await doctor.create(req.body)
console.log(resp);
res.status(201).json(resp)
}
module.exports={registerDoctors}