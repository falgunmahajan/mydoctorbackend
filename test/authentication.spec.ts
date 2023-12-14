import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { user } from "../src/models/users";
import * as send from "../src/utils/sendMail";
import otp from "otp-generator";
import { server } from "../src/app";
import { hospital } from "../src/models/hospital";
import bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

chai.use(chaiHttp);
describe("Authentication Api Testing", () => {
  let findStub: SinonStub;
  let passStub: SinonStub;
  let sendOtpStub: SinonStub;
  let otpStub: SinonStub;
  let tokenStub: SinonStub;
  let messageStub:SinonStub
  afterEach(()=>{
    if(findStub)findStub.restore()
    if(passStub)passStub.restore()
    if(sendOtpStub)sendOtpStub.restore()
    if(otpStub)otpStub.restore()
    if(tokenStub)tokenStub.restore()
    if(messageStub)messageStub.restore()
  })
    after(() => {
        server.close();
      });
  let userData: any = {
    Id: "b07188c7-1ffe-481f-8d88-31d225844607",
    firstName: "Dr. Falgun ",
    lastName: "Mahajan",
    email: "falgunmahajan1999@gmail.com",
    contactNumber: "4234642665",
    password: "$2a$10$1QhAVLfcNv2HbSQKrVX0yOv7ccyiY/qu4XxyxNypBG3/jn93peQLG",
    gender: "male",
    role: "doctor",
    enabled: true,
    deleted: false,
    createdAt: "2023-10-16T08:22:40.502Z",
    updatedAt: "2023-10-16T08:22:40.502Z",
  };
  let tokenStr =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiIyMTI3ODMiLCJpYXQiOjE3MDI1MzM0NjQsImV4cCI6MTcwMjc5MjY2NH0.pX4k5iEGtgzi_ZIgTZ_LYBi0iEDScYA0skoKofPgkf0";
    const transporter:any={
      sendMail:()=>{}
    }
  it("should login authenticated user", (done) => {
    findStub = sinon.stub(user, "findOne").returns(userData);
    passStub = sinon.stub(bcrypt, "compareSync").returns(true);
    sendOtpStub = sinon.stub(nodemailer, "createTransport").returns(transporter);
    messageStub=sinon.stub(transporter,"sendMail").resolves()
    otpStub = sinon.stub(otp, "generate").returns("536728");
    tokenStub = sinon.stub(jwt,"sign").returns(tokenStr);
    chai
      .request(server)
      .post("/authentication")
      .send({ email: "falgunmahajan1999@gmail.com", password: "Falgun17@" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({
            otpToken:tokenStr,
            user:userData
        })
        done();
      });
  });
  it("should not login authenticated hospital", (done) => {
    findStub = sinon.stub(hospital, "findOne").returns(userData);
    passStub = sinon.stub(bcrypt, "compareSync").returns(false);
    chai
      .request(server)
      .post("/authentication")
      .send({ contactNumber: "6787978096", password: "Falgun17@" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({
            name: "NotAuthenticated",
            message: "Invalid login",
            code: 401,
            className: "not-authenticated",
            errors: {},
          })
        done();
      });
  });
});
