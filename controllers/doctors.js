
const { doctors } = require("../models/doctors");
const { user } = require("../models/users");


const registerDoctors=async(req,res)=>{
console.log(req.body)
req.body.role="doctor";
try {
    const resp = await user.create(req.body)
    await doctors.create({
        userId:resp.Id
     })
console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}
}
module.exports={registerDoctors}