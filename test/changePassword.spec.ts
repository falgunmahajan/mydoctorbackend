import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";
import sinon, { SinonStub } from "sinon";
import { user } from "../src/models/users";

import bcrypt from "bcryptjs"
chai.use(chaiHttp);
describe("Change Password Api Testing", () => {
  let findStub: SinonStub;
  let passStub: SinonStub;
  let updateStub: SinonStub;
  afterEach(() => {
    if (findStub) findStub.restore();
    if (passStub) passStub.restore();
    if (updateStub) updateStub.restore();
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
  it("should change password", (done) => {
    findStub = sinon.stub(user, "findOne").resolves(userData);
    passStub = sinon.stub(bcrypt, "compareSync").returns(true);
    updateStub = sinon.stub(user, "update").resolves();
    chai
      .request(server)
      .post("/changepassword")
      .send({
        id: "b07188c7-1ffe-481f-8d88-31d225844607",
        oldPassword: "Falgun17@",
        newPassword: "Falgun17@",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({message:"Your Password is Successfully Changed"})
        done()
      });
  });
  it("should not change password", (done) => {
    findStub = sinon.stub(user, "findOne").resolves(userData);
    passStub = sinon.stub(bcrypt, "compareSync").returns(false);
    chai
      .request(server)
      .post("/changepassword")
      .send({
        id: "b07188c7-1ffe-481f-8d88-31d225844607",
        oldPassword: "Falgun17@",
        newPassword: "Falgun17@",
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({message:"Your Old Password is Wrong"})
        done()
      });
  });
});
