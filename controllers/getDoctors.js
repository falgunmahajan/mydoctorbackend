const { doctors } = require("../models/doctors");
const { hospital } = require("../models/hospital");
const { speciality } = require("../models/speciality");
const { user } = require("../models/users");

const getDoctors=async(req,res)=>{
    try {
        const resp= await doctors.findAll({
            include: [{
              model: user,
            },
            {
              model: speciality,
            },
            {
              model: hospital,
            },
          ]
          });
          res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
   
}
module.exports={getDoctors}