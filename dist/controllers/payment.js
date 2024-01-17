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
// const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')("sk_test_51NdoNiSFj6jLJ1xoUDtERgSGcvvSdjAI6diLTBgsqH0ETMS1fKWYW1hz9Rl0bZuoetP9kcRxPkrKDWtONqJ3m1wq00XwqwtntQ");
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env);
    const userData = res.locals.user;
    try {
        const expiry = (0, getExpiry_1.getExpiry)(req.body.expiryDate);
        // const token = await stripe.tokens.create({
        //     card: {
        //       number: req.body.cardNumber,
        //       exp_month:expiry.month,
        //       exp_year: expiry.year,
        //       cvc: req.body.cvv,
        //     },
        //   });
        // const charge=await stripe.charges.create({
        //   source:token.id,
        //   currency:"INR",
        //   amount:(req.body.consultancyPrice)*100
        // })
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: "INR",
            amount: (req.body.consultancyPrice) * 100,
            payment_method_data: {
                type: 'card',
                card: {
                    number: req.body.cardNumber,
                    exp_month: expiry.month,
                    exp_year: expiry.year,
                    cvc: req.body.cvv,
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