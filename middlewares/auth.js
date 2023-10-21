const { doctors } = require("../models/doctors");
const { hospital } = require("../models/hospital");
const { patient } = require("../models/patient");
const { speciality } = require("../models/speciality");
const { user } = require("../models/users");
const { verifyToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
  console.log(req.headers.authorization);
  const role = req.params.role;
  console.log(role);
  try {
    const payload = verifyToken(req.headers.authorization);
    console.log(payload);
    let userData;
    if (role === "patient")     {
      userData = await patient.findOne({
        include: {
          model: user,
          where: {
            Id: payload.Id,
          },
        },
      });
    }
    else if (role === "doctor") {
      userData = await doctors.findOne({
        include: [{
          model: user,
          where: {
            Id: payload.Id,
          },
        },
        {
          model: speciality,
        },
        {
          model: hospital,
        },
      ]
      });
    } else {
      userData = await hospital.findOne({
        where: {
          Id: payload.Id,
        },
      });
    }
    if (!userData) {
      throw new Error("User not found");
    } else {
      req.user = userData;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
  //     const userData=await user.findOne({where:{
  //       Id:payload.Id
  //     }})|| await hospital.findOne({
  //         where:{
  //             Id:payload.Id
  //         }
  //     })
  //     if(!userData){
  //         throw new Error("User not found")
  //     }
  //     else{
  //         req.user=userData;
  //         next()
  //     }
  // } catch (error) {
  //     console.log(error)
  //     res.status(401).json({message:"Unauthorized User"})
  // }
};
module.exports = { auth };
