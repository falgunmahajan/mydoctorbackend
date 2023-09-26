const { users, patient } = require("../models/patient")
// const { getHashPassword } = require("../utils/password")

const registerPatients=async(req,res)=>{
console.log(req.body)
req.body.role="patient";
try {
    const resp = await patient.create(req.body)
console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json({message:"Something went wrong"})
}

}
module.exports={registerPatients}