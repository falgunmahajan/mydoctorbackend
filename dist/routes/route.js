"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.route = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const specialities_1 = require("../controllers/specialities");
const doctors_1 = require("../controllers/doctors");
const patient_1 = require("../controllers/patient");
const hospital_1 = require("../controllers/hospital");
const authentication_1 = require("../controllers/authentication");
const otpVerification_1 = require("../controllers/otpVerification");
const changePassword_1 = require("../controllers/changePassword");
const updateProfiles_1 = require("../controllers/updateProfiles");
const authorization_1 = require("../controllers/authorization");
const auth_1 = require("../middlewares/auth");
const accounts_1 = require("../controllers/accounts");
const slots_1 = require("../controllers/slots");
exports.route = express_1.default.Router();
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assests/images/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: exports.storage });
exports.route.post("/speciality", specialities_1.createSpecialities);
exports.route.post("/patient", patient_1.registerPatients);
exports.route.post("/doctor", doctors_1.registerDoctors);
exports.route.post("/hospital", hospital_1.registerHospitals);
exports.route.post("/authentication", authentication_1.authentication);
exports.route.post("/otpverification", otpVerification_1.otpVerification);
exports.route.post("/changepassword", changePassword_1.changePassword);
exports.route.put("/updateProfile/:role", upload.single('image'), updateProfiles_1.updateProfile);
exports.route.post("/slots", slots_1.createSlots);
exports.route.get("/authorization/:role", auth_1.auth, authorization_1.authorization);
exports.route.delete("/slots", slots_1.deleteSlots);
//  route.get("/hospital/:id",getHospitalById);
exports.route.get("/slots", slots_1.getSlots);
exports.route.get("/accounts/:role", accounts_1.isUnique);
exports.route.get("/specializations", specialities_1.getSpecialities);
exports.route.get("/hospitals", hospital_1.getHospitals);
exports.route.get("/doctors", doctors_1.getDoctors);
exports.route.get("/doctor/:Id", doctors_1.getDoctorById);
