const { patient } = require("../models/patient");

const updateProfile = async (req, res) => {
  console.log(req.body);
  const role = req.params.role;
  console.log(role);
  if (role == "patient") {
    try {
        const resp = await patient.update(
            req.body.data,
             {
               where: {
                 userId: req.body.Id,
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
