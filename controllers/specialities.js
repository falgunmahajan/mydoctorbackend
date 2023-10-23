const { Op } = require("sequelize");
const { speciality } = require("../models/speciality");

const getSpecialities=async(req,res)=>{
const {limit,name}=req.query;
let specialities;
if(!name){
     specialities=await speciality.findAll({limit})
}
else{
    specialities=await speciality.findAll({limit,
    where:{
        name:{
            [Op.iRegexp]:name
        }
    }})
}

res.status(200).json({
    total:specialities.length,
    limit:Number(limit),
    skip:0,
    data:specialities
})
}
module.exports={getSpecialities}