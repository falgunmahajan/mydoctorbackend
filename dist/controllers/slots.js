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
exports.deleteSlots = exports.getSlots = exports.createSlots = void 0;
const slots_1 = require("../models/slots");
const doctors_1 = require("../models/doctors");
const users_1 = require("../models/users");
const sequelize_1 = require("sequelize");
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
    const date = req.query.date;
    if (date) {
        const dateStr = new Date(date);
        const startTime = new Date(dateStr.getFullYear(), dateStr.getMonth(), dateStr.getDate());
        const endTime = new Date(dateStr.getFullYear(), dateStr.getMonth(), dateStr.getDate() + 1);
        try {
            const resp = yield slots_1.slots.findAll({
                where: {
                    startTime: {
                        [sequelize_1.Op.gte]: startTime.toISOString(),
                        [sequelize_1.Op.lt]: endTime.toISOString()
                    }
                },
                include: [{
                        model: doctors_1.doctors,
                        where: {
                            Id: id,
                        },
                        include: [{
                                model: users_1.user
                            }]
                    }]
            });
            console.log(resp);
            res.status(200).json(resp);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    else {
        try {
            const resp = yield slots_1.slots.findAll({
                order: [["startTime", "ASC"]],
                include: [{
                        model: doctors_1.doctors,
                        where: {
                            Id: id,
                        },
                        include: [{
                                model: users_1.user
                            }]
                    }]
            });
            res.status(200).json(resp);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
});
exports.getSlots = getSlots;
const deleteSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slotsId = req.query.slotsId;
    try {
        const resp = yield slots_1.slots.destroy({
            where: {
                Id: slotsId,
            }
        });
        res.status(200).json(resp);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteSlots = deleteSlots;
