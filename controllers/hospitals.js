const { Op } = require("sequelize");

const { hospital } = require("../models/hospital");

const getHospitals=async(req,res)=>{

   const hospitals=await hospital.findAll({})


res.json({
    total:hospitals.length,
    data:hospitals
})
}
module.exports={getHospitals}