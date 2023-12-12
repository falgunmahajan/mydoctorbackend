import { Request, Response } from "express";
import { hospital} from "../models/hospital";
import { user } from "../models/users";

const isUnique = async (req: Request, res: Response) => {
  const role = req.params.role;
  console.log(role);
  const email = req.query.email as string;
  const model = role === "hospital" ? hospital : user;
  // console.log(model);
  const contactNumber = req.query.contactNumber as string;
  // console.log(email, contactNumber);
  let resp;
  if (role === "hospital") {
    if (email) {
      resp = await hospital.findOne({
        where: {
          email: email,
        },
      });
    }
    if (contactNumber) {
      resp = await hospital.findOne({
        where: {
          contactNumber: contactNumber,
        },
      });
    }
  } else {
    if (email) {
      resp = await user.findOne({
        where: {
          email: email,
        },
      });
    }
    if (contactNumber) {
      resp = await user.findOne({
        where: {
          contactNumber: contactNumber,
        },
      });
    }
  }
  if (resp) {
    res.status(433).json({
      name: "account exists",
      message: `account already exists for ${
        email ? "email" : "contactNumber"
      }: ${req.query.email || req.query.contactNumber}`,
      code: 433,
      className: "AccountExists",
      errors: {},
    });
  } else {
    res.status(200).json([]);
  }
};
export { isUnique };
