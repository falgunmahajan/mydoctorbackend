import { Request, Response } from "express";
import { getExpiry } from "../utils/getExpiry";
// const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')("sk_test_51NdoNiSFj6jLJ1xoUDtERgSGcvvSdjAI6diLTBgsqH0ETMS1fKWYW1hz9Rl0bZuoetP9kcRxPkrKDWtONqJ3m1wq00XwqwtntQ");
export const payment=async(req:Request,res:Response)=>{
  console.log(process.env)
    const userData=res.locals.user;
    try {
       
     const expiry=getExpiry(req.body.expiryDate)
     
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
const paymentIntent= await stripe.paymentIntents.create({
  currency:"INR",
    amount:(req.body.consultancyPrice)*100,
    payment_method_data:{
      type:'card',
      card: {
        number: req.body.cardNumber,
        exp_month:expiry.month,
        exp_year: expiry.year,
        cvc: req.body.cvv,
      },
    }
})
res.json(paymentIntent)
    } catch (error) {
      console.log(error)  
    }
 
}