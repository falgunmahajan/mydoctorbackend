
const { patient } = require("../models/patient");
const { user } = require("../models/users");


const registerPatients=async(req,res)=>{
console.log(req.body)
req.body.role="patient"
try {
    const resp = await user.create(req.body);
     await patient.create({
        userId:resp.Id
     })
console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}

}
module.exports={registerPatients}