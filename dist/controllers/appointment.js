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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.getAppointment = exports.payment = void 0;
const getExpiry_1 = require("../utils/getExpiry");
const appointment_1 = require("../models/appointment");
const patient_1 = require("../models/patient");
const slots_1 = require("../models/slots");
const users_1 = require("../models/users");
const doctors_1 = require("../models/doctors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const userData = res.locals.user;
    try {
        const expiry = (0, getExpiry_1.getExpiry)(req.body.expiryDate);
        const token = yield stripe.tokens.create({
            card: {
                number: req.body.cardNumber,
                exp_month: expiry.month,
                exp_year: expiry.year,
                cvc: req.body.cvv,
            },
        });
        console.log(token);
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: "INR",
            amount: req.body.consultancyPrice * 100,
            payment_method_data: {
                type: "card",
                card: {
                    token: token.id,
                },
            },
        });
        req.body.patientId = userData.Id;
        const slotData = yield slots_1.slots.findOne({
            where: {
                Id: req.body.slotId,
            },
        });
        console.log(slotData);
        if (slotData) {
            let count = slotData.count + 1;
            yield slots_1.slots.update({
                count: count,
            }, {
                where: {
                    Id: req.body.slotId,
                },
            });
        }
        const resp = yield appointment_1.appointment.create(req.body);
        res.status(201).json({
            appointmentId: resp.Id,
            status: "appointment booked sucessfully",
            payment: "payment sucessfull",
        });
    }
    catch (error) {
        console.log(error.type);
        if (error.type === "StripeCardError") {
            res.status(427).json({
                name: "invalid-cardNumber-field",
                message: "field `cardNumber` is invalid",
                code: 427,
                className: "InvalidFieldError",
                data: {
                    cardNumber: req.body.cardNumber,
                    expiryDate: req.body.expiryDate,
                    cvv: req.body.cvv,
                    slotId: req.body.slotsId,
                    doctorId: req.body.doctorId,
                },
                errors: {},
            });
        }
    }
});
exports.payment = payment;
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.query.patientId;
    const doctorId = req.query.doctorId;
    console.log(patientId, doctorId);
    let resp;
    try {
        if (patientId) {
            resp = yield appointment_1.appointment.findAll({
                where: {
                    patientId: patientId,
                },
                include: [
                    {
                        model: doctors_1.doctors,
                        include: [
                            {
                                model: users_1.user,
                            },
                        ],
                    },
                    {
                        model: slots_1.slots,
                    },
                ],
            });
        }
        if (doctorId) {
            resp = yield appointment_1.appointment.findAll({
                where: {
                    doctorId: doctorId,
                },
                include: [
                    {
                        model: patient_1.patient,
                        include: [
                            {
                                model: users_1.user,
                            },
                        ],
                    },
                    {
                        model: slots_1.slots,
                    },
                ],
            });
        }
        res.status(200).json(resp);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAppointment = getAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.query.appointmentId;
    const resp = yield appointment_1.appointment.destroy({
        where: {
            Id: appointmentId,
        },
    });
    res.status(200).json({ message: "Appointment Deleted successfully" });
});
exports.deleteAppointment = deleteAppointment;
