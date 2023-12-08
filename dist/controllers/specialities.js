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
exports.createSpecialities = exports.getSpecialities = void 0;
const sequelize_1 = require("sequelize");
const speciality_1 = require("../models/speciality");
const getSpecialities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    let specialities;
    if (!name) {
        specialities = yield speciality_1.speciality.findAll();
    }
    else {
        specialities = yield speciality_1.speciality.findAll({
            where: {
                name: {
                    [sequelize_1.Op.iRegexp]: name
                }
            }
        });
    }
    res.status(200).json({
        total: specialities.length,
        data: specialities
    });
});
exports.getSpecialities = getSpecialities;
const createSpecialities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = req.body.map((item) => __awaiter(void 0, void 0, void 0, function* () { return yield speciality_1.speciality.create(item); }));
    res.json(resp);
});
exports.createSpecialities = createSpecialities;
