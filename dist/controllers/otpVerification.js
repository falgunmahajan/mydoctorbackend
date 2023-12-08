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
exports.otpVerification = void 0;
const jwt_1 = require("../utils/jwt");
const otpVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const tokenPayload = (0, jwt_1.verifyToken)(req.body.user.otpToken);
        const orgOtp = tokenPayload.otp;
        console.log(orgOtp);
        if (orgOtp == req.body.otp) {
            const token = (0, jwt_1.getToken)(req.body.user.user);
            res.status(201).json({ accessToken: token, user: req.body.user.user });
        }
        else {
            res.status(401).json({ msg: "Invalid OTP" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Invalid OTP" });
    }
});
exports.otpVerification = otpVerification;
