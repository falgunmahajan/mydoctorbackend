const express=require("express");
const { registerPatients } = require("../controllers/patients");
const { registerDoctors } = require("../controllers/doctors");
const { isUnique } = require("../controllers/accounts");
const route=express.Router();
route.post("/patients",registerPatients)
route.post("/doctors",registerDoctors);
route.get("/accounts",isUnique)
module.exports={route}