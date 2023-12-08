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
exports.changePassword = void 0;
const users_1 = require("../models/users");
const password_1 = require("../utils/password");
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const userData = yield users_1.user.findOne({ where: {
                Id: req.body.id,
            } });
        if (userData) {
            if ((0, password_1.matchedPassword)(req.body.oldPassword, userData.password)) {
                yield users_1.user.update({ password: req.body.newPassword }, {
                    where: {
                        Id: req.body.id,
                    }
                });
                res.status(201).json({ message: "Your Password is Successfully Changed" });
            }
            else {
                res.status(401).json({ message: "Your Old Password is Wrong" });
            }
        }
    }
    catch (error) {
    }
});
exports.changePassword = changePassword;
