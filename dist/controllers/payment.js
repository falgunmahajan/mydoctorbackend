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
exports.payment = void 0;
const getExpiry_1 = require("../utils/getExpiry");
const Stripe = require('stripe');
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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
            amount: (req.body.consultancyPrice) * 100,
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id
                },
            }
        });
        res.json(paymentIntent);
    }
    catch (error) {
        console.log(error);
    }
});
exports.payment = payment;
