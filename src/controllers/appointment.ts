import { Request, Response } from "express";
import { getExpiry } from "../utils/getExpiry";
import { appointment } from "../models/appointment";
import { patient } from "../models/patient";
import { slots } from "../models/slots";
import { user } from "../models/users";
const Stripe = require("stripe");

export const payment = async (req: Request, res: Response) => {
  console.log(req.body);
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const userData = res.locals.user;
  try {
    const expiry = getExpiry(req.body.expiryDate);

    const token = await stripe.tokens.create({
      card: {
        number: req.body.cardNumber,
        exp_month: expiry.month,
        exp_year: expiry.year,
        cvc: req.body.cvv,
      },
    });
    console.log(token);

    const paymentIntent = await stripe.paymentIntents.create({
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
    const resp = await appointment.create(req.body);
    res.json({
      appointmentId: resp.Id,
      status: "appointment booked sucessfully",
      payment: "payment sucessfull",
    });
  } catch (error: any) {
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
};
export const getAppointment = async (req: Request, res: Response) => {
  const patientId = req.query.patientId as string;
  const doctorId = req.query.doctorId as string;
  console.log(patientId, doctorId);
  let resp;
  try {
    if (patientId) {
      resp = await appointment.findAll({
        where: {
          patientId: patientId,
        },
      });
    }
    if (doctorId) {
      resp = await appointment.findAll({
        where: {
          doctorId: doctorId,
        },
        include: [
          {
            model: patient,
            include:[{
              model:user
            }]
          },
          {
            model: slots,
          },
        ],
      });
    }
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Something went wrong" });
  }
};
