"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const users_1 = require("./models/users");
const doctors_1 = require("./models/doctors");
const patient_1 = require("./models/patient");
const hospital_1 = require("./models/hospital");
const slots_1 = require("./models/slots");
const appointment_1 = require("./models/appointment");
const speciality_1 = require("./models/speciality");
const doctorSpecialityMapping_1 = require("./models/doctorSpecialityMapping");
const hospitalDoctorMapping_1 = require("./models/hospitalDoctorMapping");
const route_1 = require("./routes/route");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const server = app.listen(process.env.PORT, () => {
    console.log(`The app is listening at ${process.env.PORT}`);
});
exports.server = server;
const createModel = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.authenticate();
    console.log("Database Successfully connected");
    yield users_1.user.sync();
    console.log("User model is created");
    yield hospital_1.hospital.sync();
    console.log("Hospital model is created");
    yield doctors_1.doctors.sync();
    console.log("Doctor model is created");
    yield patient_1.patient.sync();
    console.log("Patient model is created");
    yield hospitalDoctorMapping_1.hospitalDoctorMapping.sync();
    console.log("HospitalDoctor model is created");
    yield slots_1.slots.sync();
    console.log("Slot model is created");
    yield speciality_1.speciality.sync();
    console.log("Speciality model is created");
    yield appointment_1.appointment.sync();
    console.log("Appointment model is created");
    yield doctorSpecialityMapping_1.doctorSpecialityMapping.sync();
    console.log("DoctorSpeciality model is created");
});
exports.createModel = createModel;
createModel();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("", route_1.route);
