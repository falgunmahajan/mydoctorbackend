require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { route } = require("./routes/route");
const { sequelize } = require("./database");
const { user } = require("./models/users");
const { hospital } = require("./models/hospital");
const { speciality } = require("./models/speciality");
const { doctors } = require("./models/doctors");
const { patient } = require("./models/patient");
const { hospitalDoctorMapping } = require("./models/hospitaldoctormapping");
const { slots } = require("./models/slots");
const { appointment } = require("./models/appointment");
const { otp, otpModel } = require("./models/otp");
const { doctorSpecialityMapping } = require("./models/doctorSpecialityMapping");
const app = express();
// mongoose.connect(process.env.DbUrl).then(()=>console.log("Database Successfully connected"))

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
app.post("/speciality", async (req, res) => {
  const resp = req.body.map(async (item) => await speciality.create(item));
  // const resp = await speciality.create(req.body);
  res.json(resp);
});
module.exports = { app, server,createModel};
