const { speciality } = require("../models/speciality");

const getSpecialities=async(req,res)=>{
const {limit}=req.query;
const specialities=await speciality.findAll({limit})
res.json({
    total:specialities.length,
    limit:Number(limit),
    skip:0,
    data:specialities
})
}
module.exports={getSpecialities}