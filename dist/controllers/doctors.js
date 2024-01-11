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
exports.getDoctorById = exports.registerDoctors = exports.getDoctors = void 0;
const doctors_1 = require("../models/doctors");
const users_1 = require("../models/users");
const speciality_1 = require("../models/speciality");
const hospital_1 = require("../models/hospital");
const sequelize_1 = require("sequelize");
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const specialityStr = req.query.speciality;
    console.log(specialityStr);
    let doctor;
    try {
        let resp;
        if (name) {
            resp = yield doctors_1.doctors.findAll({
                include: [
                    {
                        model: users_1.user,
                        where: {
                            [sequelize_1.Op.or]: [
                                {
                                    firstName: {
                                        [sequelize_1.Op.iRegexp]: name,
                                    },
                                },
                                {
                                    lastName: {
                                        [sequelize_1.Op.iRegexp]: name,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        model: speciality_1.speciality,
                    },
                    {
                        model: hospital_1.hospital,
                    },
                ],
            });
        }
        else if (specialityStr) {
            resp = yield doctors_1.doctors.findAll({
                include: [
                    {
                        model: users_1.user,
                    },
                    {
                        model: speciality_1.speciality,
                        where: {
                            name: {
                                [sequelize_1.Op.iRegexp]: specialityStr
                            }
                        }
                    },
                    {
                        model: hospital_1.hospital,
                    },
                ],
            });
        }
        else {
            resp = yield doctors_1.doctors.findAll({
                include: [
                    {
                        model: users_1.user,
                    },
                    {
                        model: speciality_1.speciality,
                    },
                    {
                        model: hospital_1.hospital,
                    },
                ],
            });
        }
        res.status(200).json(resp);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getDoctors = getDoctors;
const registerDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    req.body.role = "doctor";
    try {
        const resp = yield users_1.user.create(req.body);
        yield doctors_1.doctors.create({
            userId: resp.Id,
        });
        // console.log(resp);
        res.status(201).json(resp);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.registerDoctors = registerDoctors;
const getDoctorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.Id;
    console.log(id);
    try {
        const resp = yield doctors_1.doctors.findOne({
            where: {
                Id: id
            },
            include: [
                {
                    model: users_1.user,
                },
                {
                    model: speciality_1.speciality,
                },
                {
                    model: hospital_1.hospital,
                },
            ],
        });
        res.status(200).json(resp);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getDoctorById = getDoctorById;
