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
exports.authentication = void 0;
const users_1 = require("../models/users");
const hospital_1 = require("../models/hospital");
const password_1 = require("../utils/password");
const otp_generator_1 = require("otp-generator");
const sendMail_1 = require("../utils/sendMail");
const jwt_1 = require("../utils/jwt");
// const { getToken, otpToken } = require("../utils/jwt");
// const { matchedPassword } = require("../utils/password");
// const { sendOtp } = require("../utils/sendMail");
const authentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    let resp;
    if (req.body.email) {
        resp =
            (yield users_1.user.findOne({
                where: {
                    email: req.body.email,
                },
            }))
                ||
                    (yield hospital_1.hospital.findOne({
                        where: {
                            email: req.body.email,
                        },
                    }));
    }
    if (req.body.contactNumber) {
        resp =
            (yield users_1.user.findOne({
                where: {
                    contactNumber: req.body.contactNumber,
                },
            }))
                ||
                    (yield hospital_1.hospital.findOne({
                        where: {
                            contactNumber: req.body.contactNumber,
                        },
                    }));
    }
    // console.log(resp)
    if (resp && (0, password_1.matchedPassword)(req.body.password, resp.password)) {
        const otp = (0, otp_generator_1.generate)(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        //  console.log(typeof otp)
        yield (0, sendMail_1.sendOtp)(otp, resp);
        const token = (0, jwt_1.otpToken)(otp);
        res.status(201).json({ otpToken: token, user: resp });
    }
    else {
        res
            .status(401)
            .json({
            name: "NotAuthenticated",
            message: "Invalid login",
            code: 401,
            className: "not-authenticated",
            errors: {},
        });
    }
});
exports.authentication = authentication;
