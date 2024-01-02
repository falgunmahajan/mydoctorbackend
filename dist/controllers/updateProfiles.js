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
exports.updateProfile = void 0;
const patient_1 = require("../models/patient");
const updateData_1 = require("../utils/updateData");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req)
    console.log(req.body);
    if (req.file) {
        req.body.image = `/assests/images/uploads/${req.file.originalname}`;
    }
    const role = req.params.role;
    console.log(role);
    // console.log(req.body)
    if (role == "patient") {
        try {
            if (req.body.firstName || req.body.lastName || req.body.contactNumber || req.body.email || req.body.gender) {
                (0, updateData_1.updateUser)(req.body);
            }
            const resp = yield patient_1.patient.update(req.body, {
                where: {
                    userId: req.body.userId,
                },
            });
            res.status(201).json(resp);
        }
        catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    if (role == "doctor") {
        // console.log("data",req.body)
        if (req.body.languages) {
            req.body.languages = JSON.parse(req.body.languages);
        }
        if (req.body.specialities) {
            try {
                yield (0, updateData_1.updateSpecialities)(req.body);
                yield (0, updateData_1.updateDoctorProfile)(req.body);
                res.status(201).json({ message: "Your data is updated" });
            }
            catch (error) {
                res.status(500).json({ message: "Something went wrong" });
            }
        }
        else if (req.body.profile) {
            console.log("51");
            try {
                yield (0, updateData_1.updateProfessional)(req.body);
                res.status(201).json({ message: "Your data is updated" });
            }
            catch (error) {
                res.status(500).json({ message: "Something went wrong" });
            }
        }
        else {
            try {
                if (req.body.firstName || req.body.lastName || req.body.contactNumber || req.body.email || req.body.gender) {
                    (0, updateData_1.updateUser)(req.body);
                }
                yield (0, updateData_1.updateDoctorProfile)(req.body);
                res.status(201).json({ message: "Your data is updated" });
            }
            catch (error) {
                // console.log(error)
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
});
exports.updateProfile = updateProfile;
