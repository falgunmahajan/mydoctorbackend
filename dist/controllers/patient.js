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
exports.registerPatients = void 0;
const patient_1 = require("../models/patient");
const users_1 = require("../models/users");
const registerPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    req.body.role = "patient";
    try {
        const resp = yield users_1.user.create(req.body);
        yield patient_1.patient.create({
            userId: resp.Id
        });
        console.log(resp);
        res.status(201).json(resp);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.registerPatients = registerPatients;
