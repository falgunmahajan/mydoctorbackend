import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { server } from "../src/app";
import { user } from "../src/models/users";
import { patient } from "../src/models/patient";
chai.use(chaiHttp);
describe("Patient Api Testing", () => {
  let stub:SinonStub;
  afterEach(()=>{
    if(stub)stub.restore()
  })
    after(() => {
        server.close();
      });
      const patientData = {
        firstName: " abc def ",
        lastName: "ghi",
        email: "ghi@gmail.com",
        contactNumber: "7385387892",
        password: "$2a$10$mWuJ/BjN7.jGAdS/nD2dGuQpFcZdq.L1fDojnDxv08Ig3Q0DzCjQS",
        gender: "male",
      };
  it("should register all the patients", (done) => {
    const patientList: any = {
      Id: "ad9f2f72-4da8-4b28-813b-959615dae476",
      firstName: " abc def ",
      lastName: "ghi",
      email: "ghi@gmail.com",
      contactNumber: "7385387892",
      password: "$2a$10$mWuJ/BjN7.jGAdS/nD2dGuQpFcZdq.L1fDojnDxv08Ig3Q0DzCjQS",
      gender: "male",
      role: "patient",
      enabled: true,
      deleted: false,
      createdAt: "2023-11-08T04:50:27.257Z",
      updatedAt: "2023-11-08T04:50:27.257Z",
    };
    
    stub= sinon.stub(user, "create").resolves(patientList);
    sinon.stub(patient, "create");
    chai
      .request(server)
      .post("/patient")
      .send(patientData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(patientList);
        done();
      });
     
    
  });
  it("it should return error",(done)=>{
    stub= sinon.stub(user, "create").rejects()
    chai
      .request(server)
      .post("/patient")
      .send(patientData)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  })
});