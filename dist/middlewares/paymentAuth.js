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
exports.paymentAuth = void 0;
const jwt_1 = require("../utils/jwt");
const patient_1 = require("../models/patient");
const users_1 = require("../models/users");
const paymentAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            const payload = (0, jwt_1.verifyToken)(req.headers.authorization);
            // console.log(payload);
            let userData = yield patient_1.patient.findOne({
                include: {
                    model: users_1.user,
                    where: {
                        Id: payload.Id,
                    },
                },
            });
            if (!userData) {
                throw new Error("User not found");
            }
            else {
                res.locals.user = userData;
                next();
            }
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized User" });
    }
});
exports.paymentAuth = paymentAuth;
