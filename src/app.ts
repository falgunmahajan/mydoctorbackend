
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import { user } from "./models/users";
import { doctors } from "./models/doctors";
import { patient } from "./models/patient";
import { hospital } from "./models/hospital";
import { slots } from "./models/slots";
import { appointment } from "./models/appointment";
import { speciality } from "./models/speciality";
import { doctorSpecialityMapping } from "./models/doctorSpecialityMapping";
import { hospitalDoctorMapping } from "./models/hospitalDoctorMapping";
import { route } from "./routes/route";
dotenv.config()
const app = express();

 const server = app.listen(process.env.PORT, () => {
  console.log(`The app is listening at ${process.env.PORT}`);
});
const createModel = async () => {
  await sequelize.authenticate();
  console.log("Database Successfully connected");
  await user.sync();
  console.log("User model is created");

  await hospital.sync();
  console.log("Hospital model is created");

  await doctors.sync();
  console.log("Doctor model is created");

  await patient.sync();
  console.log("Patient model is created");

  await hospitalDoctorMapping.sync();
  console.log("HospitalDoctor model is created");

  await slots.sync();
  console.log("Slot model is created");

  await speciality.sync();
  console.log("Speciality model is created");

  await appointment.sync();
  console.log("Appointment model is created");

  await doctorSpecialityMapping.sync()
  console.log("DoctorSpeciality model is created")
};
createModel();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("", route);

export{ app, server,
    createModel
};
