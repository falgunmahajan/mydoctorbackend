const { json } = require("sequelize");
const { patient } = require("../models/patient");
const { doctors } = require("../models/doctors");

const updateProfile = async (req, res) => {
  console.log(req)
  console.log(req.body);
  if(req.file){

    req.body.image=`/assests/images/uploads/${req.file.originalname}`
  }
  const role = req.params.role;
  console.log(role);
  console.log(req.body)
  if (role == "patient") {
    try {
        const resp = await patient.update(
            req.body,
             {
               where: {
                 userId: req.body.userId,
               },
             }
           );
           res.status(201).json(resp)  
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
    
  }
  if (role == "doctor") {
    req.body.languages=JSON.parse(req.body.languages)
    console.log("data",req.body)
    try {
        const resp = await doctors.update(
            req.body,
             {
               where: {
                 userId: req.body.userId,
               },
             }
           );
           res.status(201).json(resp)  
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
    
  }

};
module.exports = { updateProfile };
