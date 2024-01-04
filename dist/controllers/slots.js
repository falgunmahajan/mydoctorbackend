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
exports.getSlots = exports.createSlots = void 0;
const slots_1 = require("../models/slots");
const doctors_1 = require("../models/doctors");
const users_1 = require("../models/users");
const createSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const resp = yield slots_1.slots.create(req.body);
        res.status(201).json(resp);
    }
    catch (error) {
        // console.log(error);
        res.status(500).json(error);
    }
});
exports.createSlots = createSlots;
const getSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.doctorId;
    try {
        const resp = yield slots_1.slots.findAll({
            include: [{
                    model: doctors_1.doctors,
                    where: {
                        Id: id
                    },
                    include: [{
                            model: users_1.user
                        }]
                }]
        });
        res.status(200).json(resp);
    }
    catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getSlots = getSlots;
