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
exports.isUnique = void 0;
const hospital_1 = require("../models/hospital");
const users_1 = require("../models/users");
const isUnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.params.role;
    console.log(role);
    const email = req.query.email;
    const model = role === "hospital" ? hospital_1.hospital : users_1.user;
    console.log(model);
    const contactNumber = req.query.contactNumber;
    console.log(email, contactNumber);
    let resp;
    if (role === "hospital") {
        if (email) {
            resp = yield hospital_1.hospital.findOne({
                where: {
                    email: email,
                },
            });
        }
        if (contactNumber) {
            resp = yield hospital_1.hospital.findOne({
                where: {
                    contactNumber: contactNumber,
                },
            });
        }
    }
    else {
        if (email) {
            resp = yield users_1.user.findOne({
                where: {
                    email: email,
                },
            });
        }
        if (contactNumber) {
            resp = yield users_1.user.findOne({
                where: {
                    contactNumber: contactNumber,
                },
            });
        }
    }
    if (resp) {
        res.status(433).json({
            name: "account exists",
            message: `account already exists for ${email ? "email" : "contactNumber"}: ${req.query.email || req.query.contactNumber}`,
            code: 433,
            className: "AccountExists",
            errors: {},
        });
    }
    else {
        res.status(200).json([]);
    }
});
exports.isUnique = isUnique;
