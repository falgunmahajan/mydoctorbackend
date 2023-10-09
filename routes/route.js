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
route.post("/patients",registerPatients)
route.post("/doctors",registerDoctors);
route.post("/hospital",registerHospitals);
route.post("/authentication",authentication);
route.post("/otpverification",otpVerification);
route.post("/changepassword",changePassword);
route.post("/updateProfile/:role",updateProfile);
route.get("/authorization",auth,authorization);
route.get("/hospital/:id",getHospital);
route.get("/accounts/:role",isUnique);
route.get("/specializations",getSpecialities)
module.exports={route}