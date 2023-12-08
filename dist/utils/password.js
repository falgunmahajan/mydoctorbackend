"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchedPassword = exports.getHashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getHashPassword = (pswd) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(pswd, salt);
    return hash;
};
exports.getHashPassword = getHashPassword;
const matchedPassword = (pswd, storedPswd) => {
    return bcryptjs_1.default.compareSync(pswd, storedPswd);
};
exports.matchedPassword = matchedPassword;
