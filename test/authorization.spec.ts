import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";
import sinon, { SinonStub } from "sinon";

import { patient } from "../src/models/patient";
import { doctors } from "../src/models/doctors";
import { hospital } from "../src/models/hospital";
const jwt = require("jsonwebtoken");
chai.use(chaiHttp);
describe("Authorization Api Testing", () => {
    let findStub:SinonStub
    let tokenStub:SinonStub
    afterEach(()=>{
       if(findStub) findStub.restore()
       if(tokenStub) tokenStub.restore()
    })
        after(() => {
            server.close();
          });
          const userData :any = {
            Id: "459b9589-7c4d-4e6a-beff-efee90cdd744",
            userId: "07dc0c17-b482-4910-9c88-875edecf7131",
            dob: "1994-05-11",
            BloodGroup: "AB+",
            HouseNo: "H.no.165",
            Colony: "Bakshi Nagar",
            city: "Jammu",
            state: "J&k",
            country: "India",
            pincode: "180001",
            image: "/assests/images/uploads/decoration.jpeg",
            createdAt: "2023-10-13T05:25:14.687Z",
            updatedAt: "2023-11-08T05:22:12.481Z",
            user: {
              Id: "07dc0c17-b482-4910-9c88-875edecf7131",
              firstName: "Anjali ",
              lastName: "Sharma",
              email: "falgun.mahajan@avi.software",
              contactNumber: "4654656356",
              password:
                "$2a$10$.QFRU/HsOdgbJkTvrfxw8.U1cKzyouPGOHPFtmLX3HDevPR6qqiNG",
              gender: "male",
              role: "patient",
              enabled: true,
              deleted: false,
              createdAt: "2023-10-13T05:25:14.677Z",
              updatedAt: "2023-11-08T05:21:20.949Z",
            },
          };
      const tokenStr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3ZGMwYzE3LWI0ODItNDkxMC05Yzg4LTg3NWVkZWNmNzEzMSIsImVtYWlsIjoiZmFsZ3VuLm1haGFqYW5AYXZpLnNvZnR3YXJlIiwiaWF0IjoxNzAyNTM3NDk2LCJleHAiOjE3MDI3MTAyOTZ9.nGZXeml4KmJjFdfED4AU_tMse68BUs2VOBdIgYMhoHA"
  it("should authorize the patient", (done) => {
  
 tokenStub=sinon.stub(jwt,"verify").returns({
    "Id": "07dc0c17-b482-4910-9c88-875edecf7131",
    "email": "falgun.mahajan@avi.software",})
    findStub=sinon.stub(patient,"findOne").resolves(userData)
  chai.request(server).get("/authorization/patient").set("Authorization",tokenStr).end((err,res)=>{
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(userData)
    done();
  })
  });
  it("should authorize the doctor", (done) => {
  
    tokenStub=sinon.stub(jwt,"verify").returns({
       "Id": "07dc0c17-b482-4910-9c88-875edecf7131",
       "email": "falgun.mahajan@avi.software",})
       findStub=sinon.stub(doctors,"findOne").resolves(userData)
     chai.request(server).get("/authorization/doctor").set("Authorization",tokenStr).end((err,res)=>{
       expect(res).to.have.status(200)
       expect(res.body).to.deep.equal(userData)
       done();
     })
     });
     it("should authorize the hospital", (done) => {
  
        tokenStub=sinon.stub(jwt,"verify").returns({
           "Id": "07dc0c17-b482-4910-9c88-875edecf7131",
           "email": "falgun.mahajan@avi.software",})
           findStub=sinon.stub(hospital,"findOne").resolves(userData)
         chai.request(server).get("/authorization/hospital").set("Authorization",tokenStr).end((err,res)=>{
           expect(res).to.have.status(200)
           expect(res.body).to.deep.equal(userData)
           done();
         })
         });
     it("should not authorize the doctor",(done)=>{
        tokenStub=sinon.stub(jwt,"verify").returns({
            "Id": "07dc0c17-b482-4910-9c88-875edecf7131",
            "email": "falgun.mahajan@avi.software",})
            findStub=sinon.stub(doctors,"findOne")
          chai.request(server).get("/authorization/doctor").set("Authorization",tokenStr).end((err,res)=>{
            expect(res).to.have.status(401)
            expect(res.body).to.deep.equal({ message: "Unauthorized User" })
            done();
          })
     })
});
