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
exports.getHospitalById = exports.registerHospitals = exports.getHospitals = void 0;
const hospital_1 = require("../models/hospital");
const getHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitals = yield hospital_1.hospital.findAll({});
    res.json({
        total: hospitals.length,
        data: hospitals
    });
});
exports.getHospitals = getHospitals;
const registerHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const resp = yield hospital_1.hospital.create(req.body);
        console.log(resp);
        res.status(201).json(resp);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.registerHospitals = registerHospitals;
const getHospitalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitalId = req.params.id;
    try {
        const resp = yield hospital_1.hospital.findOne({
            where: {
                Id: hospitalId
            }
        });
        if (resp) {
            res.status(200).json(resp);
        }
        else {
            res.status(400).json({ msg: "Not Found" });
        }
    }
    catch (error) {
        res.status(400).json({ msg: "Not Found" });
    }
});
exports.getHospitalById = getHospitalById;
