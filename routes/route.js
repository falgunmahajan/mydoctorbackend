const express=require("express");
const { registerPatients } = require("../controllers/patients");
const { registerDoctors } = require("../controllers/doctors");
const { isUnique } = require("../controllers/accounts");
const { registerHospitals, getHospital } = require("../controllers/hospital");
const { authentication } = require("../controllers/authentication");
const route=express.Router();
route.get("/",(req,res)=>{
    res.send({msg:"hello"})
})
route.post("/patients",registerPatients)
route.post("/doctors",registerDoctors);
route.post("/hospital",registerHospitals);
route.post("/authentication",authentication);
route.get("/hospital/:id",getHospital);
route.get("/accounts/:role",isUnique)
module.exports={route}