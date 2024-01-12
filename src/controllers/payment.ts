import { Request, Response } from "express";
import moment from "moment";
import { getExpiry } from "../utils/getExpiry";
const {STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY }=process.env
const stripe=require("stripe")(STRIPE_SECRET_KEY)
export const payment=async(req:Request,res:Response)=>{
   
    const userData=res.locals.user;
    try {
        const customer =await stripe.customers.create({
            email:userData.user.email
        })
     const expiry=getExpiry(req.body.expiryDate)
     
const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month:expiry.month,
      exp_year: expiry.year,
      cvc: req.body.cvv,
    },
  });
  const card= await stripe.customers.createSource(customer.id,{
    source:`${token.id}`
  })

    } catch (error) {
        
    }
    res.send(userData)
}