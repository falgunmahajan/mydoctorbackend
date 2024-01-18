import express from "express";
import multer from "multer"
import { createSpecialities, getSpecialities } from "../controllers/specialities";
import { getDoctors, getDoctorById, registerDoctors } from "../controllers/doctors";
import { registerPatients } from "../controllers/patient";
import {  getHospitals, registerHospitals } from "../controllers/hospital";
import { authentication } from "../controllers/authentication";
import { otpVerification } from "../controllers/otpVerification";
import { changePassword } from "../controllers/changePassword";
import { updateProfile } from "../controllers/updateProfiles";
import { authorization } from "../controllers/authorization";
import { auth } from "../middlewares/auth";
import { isUnique } from "../controllers/accounts";
import { createSlots, deleteSlots, getSlots } from "../controllers/slots";
import { getAppointment, payment } from "../controllers/appointment";
import { paymentAuth } from "../middlewares/paymentAuth";
export const route=express.Router();



export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assests/images/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

  route.post("/speciality", createSpecialities);
 route.post("/patient",registerPatients)
 route.post("/doctor",registerDoctors);
 route.post("/hospital",registerHospitals);
 route.post("/authentication",authentication);
 route.post("/otpverification",otpVerification);
 route.post("/changepassword",changePassword);
 route.put("/updateProfile/:role", upload.single('image'),updateProfile);
 route.post("/slots",createSlots)
 route.get("/authorization/:role",auth,authorization);
 route.delete("/slots",deleteSlots)
//  route.get("/hospital/:id",getHospitalById);
route.get("/slots",getSlots)
 route.get("/accounts/:role",isUnique);
route.get("/specializations",getSpecialities)
 route.get("/hospitals",getHospitals)
route.get("/doctors",getDoctors)
route.get("/doctor/:Id",getDoctorById)
route.post("/payment",paymentAuth,payment)
route.get("/appointments",getAppointment)