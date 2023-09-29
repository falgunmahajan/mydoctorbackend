const express=require("express");
const { registerPatients } = require("../controllers/patients");
const { registerDoctors } = require("../controllers/doctors");
const { isUnique } = require("../controllers/accounts");
const { registerHospitals, getHospital } = require("../controllers/hospital");
const { authentication } = require("../controllers/authentication");
const { getSpecialities } = require("../controllers/specialities");
const route=express.Router();
route.post("/patients",registerPatients)
route.post("/doctors",registerDoctors);
route.post("/hospital",registerHospitals);
route.post("/authentication",authentication);
route.get("/hospital/:id",getHospital);
route.get("/accounts/:role",isUnique);
route.get("/specializations",getSpecialities)
module.exports={route}