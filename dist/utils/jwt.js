"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpToken = exports.verifyToken = exports.getToken = void 0;
const jwt = require("jsonwebtoken");
const getToken = (resp) => {
    return jwt.sign({
        Id: resp.Id,
        email: resp.email
    }, process.env.SECRETKEY, { expiresIn: '2d' });
};
exports.getToken = getToken;
const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRETKEY);
};
exports.verifyToken = verifyToken;
const otpToken = (otp) => {
    return jwt.sign({
        otp: otp
    }, process.env.SECRETKEY, { expiresIn: '3d' });
};
exports.otpToken = otpToken;
