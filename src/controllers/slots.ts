import { Request, Response } from "express";
import { slots } from "../models/slots";

export const createSlots=async(req:Request,res:Response)=>{
    console.log(req.body)
    try {
        const resp = await slots.create(req.body);
    res.status(201).json(resp)
    } catch (error) {
        res.status(500).json(error)
    }
}