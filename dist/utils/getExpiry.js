"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiry = void 0;
const moment_1 = __importDefault(require("moment"));
const getExpiry = (dateString) => {
    const date = (0, moment_1.default)("01-2024", "MM-YYYY").toDate();
    return {
        month: (0, moment_1.default)(date).format("M"),
        year: (0, moment_1.default)(date).format("YYYY")
    };
};
exports.getExpiry = getExpiry;
