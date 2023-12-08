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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("../utils/jwt");
const patient_1 = require("../models/patient");
const users_1 = require("../models/users");
const doctors_1 = require("../models/doctors");
const speciality_1 = require("../models/speciality");
const hospital_1 = require("../models/hospital");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    const role = req.params.role;
    console.log(role);
    try {
        if (req.headers.authorization) {
            const payload = (0, jwt_1.verifyToken)(req.headers.authorization);
            console.log(payload);
            let userData;
            if (role === "patient") {
                userData = yield patient_1.patient.findOne({
                    include: {
                        model: users_1.user,
                        where: {
                            Id: payload.Id,
                        },
                    },
                });
            }
            else if (role === "doctor") {
                userData = yield doctors_1.doctors.findOne({
                    include: [{
                            model: users_1.user,
                            where: {
                                Id: payload.Id,
                            },
                        },
                        {
                            model: speciality_1.speciality,
                        },
                        {
                            model: hospital_1.hospital,
                        },
                    ]
                });
            }
            else {
                userData = yield hospital_1.hospital.findOne({
                    where: {
                        Id: payload.Id,
                    },
                });
            }
            if (!userData) {
                throw new Error("User not found");
            }
            else {
                req.user = userData;
                next();
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" });
    }
});
exports.auth = auth;
