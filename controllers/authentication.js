const { hospital } = require("../models/hospital");
const { user } = require("../models/users");
const jwt = require("jsonwebtoken");
const { matchedPassword } = require("../utils/password");

const authentication = async (req, res) => {
  console.log(req.body);
  let resp;
  resp =
    (await user.findOne({
      where: {
        email: req.body.email,
      },
    })) 
    ||
    (await hospital.findOne({
      where: {
        email: req.body.email,
      },
    }));
    console.log(resp)
  if (resp && matchedPassword(req.body.password,resp.password)) {
    const token = jwt.sign(
      {
        Id: resp.Id,
        email: resp.email,
      },
      process.env.SECRETKEY, { expiresIn: '30d' }
    );
    res.status(201).json({ accessToken: token, user: resp });
  } else {
    res
      .status(401)
      .json({
        name: "NotAuthenticated",
        message: "Invalid login",
        code: 401,
        className: "not-authenticated",
        errors: {},
      });
  }
};
module.exports = { authentication };
