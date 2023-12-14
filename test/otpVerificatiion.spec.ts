import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";
import sinon, { SinonStub } from "sinon";
import * as token from "../src/utils/jwt";
const jwt = require("jsonwebtoken");
chai.use(chaiHttp);
describe("OtpVerification Api Testing", () => {
  let verifyTokenStub: SinonStub;
  let getTokenStub: SinonStub;
  
  afterEach(() => {
    if (verifyTokenStub) verifyTokenStub.restore();
    if (getTokenStub) getTokenStub.restore();
 
  });
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
  it("should verify the otp", (done) => {
    verifyTokenStub=sinon.stub(jwt,"verify").returns({otp:"534672"})
    getTokenStub=sinon.stub(jwt,"sign").returns(tokenStr)
    chai
      .request(server)
      .post("/otpverification")
      .send({ user: { user: userData, otpToken: tokenStr }, otp: "534672" })
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.deep.equal({  accessToken: tokenStr, user: userData  })
        done();
      });
  });
  it("should not verify the otp", (done) => {
    verifyTokenStub=sinon.stub(jwt,"verify").returns({otp:"534671"})
    getTokenStub=sinon.stub(jwt,"sign").returns(tokenStr)
    chai
      .request(server)
      .post("/otpverification")
      .send({ user: { user: userData, otpToken: tokenStr }, otp: "534672" })
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.deep.equal({   msg: "Invalid OTP"   })
        done();
      });
  });
});
