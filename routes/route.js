const express=require("express");
const { registerPatients } = require("../controllers/patients");
const { registerDoctors } = require("../controllers/doctors");
const { isUnique } = require("../controllers/accounts");
const { registerHospitals, getHospital } = require("../controllers/hospital");
const { authentication } = require("../controllers/authentication");
const { getSpecialities } = require("../controllers/specialities");
const { authorization } = require("../controllers/authorization");
const { auth } = require("../middlewares/auth");
const { otpVerification } = require("../controllers/otpverification");
const { getOtpAgain } = require("../controllers/getOtpAgain");
const { changePassword } = require("../controllers/changePassword");
const { updateProfile } = require("../controllers/updateProfiles");
const route=express.Router();
const multer=require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assests/images/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })
route.post("/patient",registerPatients)
route.post("/doctor",registerDoctors);
route.post("/hospital",registerHospitals);
route.post("/authentication",authentication);
route.post("/otpverification",otpVerification);
route.post("/changepassword",changePassword);
route.post("/updateProfile/:role", upload.single('image'),updateProfile);
route.get("/authorization/:role",auth,authorization);
route.get("/hospital/:id",getHospital);
route.get("/accounts/:role",isUnique);
route.get("/specializations",getSpecialities)
module.exports={route}