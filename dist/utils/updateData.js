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
exports.updateUser = exports.updateProfessional = exports.updateSpecialities = exports.updateDoctorProfile = void 0;
const sequelize_1 = require("sequelize");
const doctorSpecialityMapping_1 = require("../models/doctorSpecialityMapping");
const doctors_1 = require("../models/doctors");
const hospitalDoctorMapping_1 = require("../models/hospitalDoctorMapping");
const users_1 = require("../models/users");
const updateDoctorProfile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield doctors_1.doctors.update(data, {
        where: {
            userId: data.userId,
        },
    });
});
exports.updateDoctorProfile = updateDoctorProfile;
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.user.update(data, {
        where: {
            Id: data.userId,
        },
    });
});
exports.updateUser = updateUser;
const updateSpecialities = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.specialities.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const record = yield doctorSpecialityMapping_1.doctorSpecialityMapping.findOne({
            where: { doctorId: data.doctorId, specialityId: item.Id },
        });
        if (!record) {
            return yield doctorSpecialityMapping_1.doctorSpecialityMapping.create({
                doctorId: data.doctorId,
                specialityId: item.Id,
            });
        }
    }));
    const specialityId = data.specialities.map((item) => item.Id);
    doctorSpecialityMapping_1.doctorSpecialityMapping.destroy({
        where: {
            doctorId: data.doctorId,
            specialityId: {
                [sequelize_1.Op.notIn]: specialityId,
            },
        },
    });
});
exports.updateSpecialities = updateSpecialities;
const updateProfessional = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data.doctorId);
    const profile = JSON.parse(data.profile);
    console.log("profile", profile);
    if (!profile.length) {
        yield hospitalDoctorMapping_1.hospitalDoctorMapping.destroy({
            truncate: true
        });
    }
    profile.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const record = yield hospitalDoctorMapping_1.hospitalDoctorMapping.findOne({
            where: { doctorId: data.doctorId, hospitalId: item.hospital.Id },
        });
        if (!record) {
            return yield hospitalDoctorMapping_1.hospitalDoctorMapping.create({
                doctorId: data.doctorId,
                hospitalId: item.hospital.Id,
                consultationFee: item.consultationFee,
                position: item.position,
            });
        }
        else {
            yield hospitalDoctorMapping_1.hospitalDoctorMapping.update({
                consultationFee: item.consultationFee,
                position: item.position,
            }, {
                where: {
                    doctorId: data.doctorId,
                    hospitalId: item.hospital.Id,
                },
            });
        }
        const hospitalId = profile.map((item) => item.hospital.Id);
        hospitalDoctorMapping_1.hospitalDoctorMapping.destroy({
            where: {
                doctorId: data.doctorId,
                hospitalId: {
                    [sequelize_1.Op.notIn]: hospitalId,
                },
            },
        });
    }));
});
exports.updateProfessional = updateProfessional;
