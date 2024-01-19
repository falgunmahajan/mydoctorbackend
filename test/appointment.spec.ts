import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { server } from "../src/app";
import { appointment } from "../src/models/appointment";
import { slots } from "../src/models/slots";
import { patient } from "../src/models/patient";
const Stripe = require("stripe");
 const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
 const jwt = require("jsonwebtoken");
describe("Appointment Api Testing", () => {
  const appointmentData: any = [
    {
      Id: "aadd9d8c-8397-4b33-a94a-72bd7e6971e3",
      patientId: "459b9589-7c4d-4e6a-beff-efee90cdd744",
      doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
      slotId: "21c2032c-3a12-434e-901e-c866849ff443",
      appointmentStatus: "Not Started",
      otherName: null,
      otherMobileNumber: null,
      createdAt: "2024-01-19T09:33:28.683Z",
      updatedAt: "2024-01-19T09:33:28.683Z",
      patient: {
        Id: "459b9589-7c4d-4e6a-beff-efee90cdd744",
        userId: "07dc0c17-b482-4910-9c88-875edecf7131",
        dob: "1994-05-11",
        BloodGroup: "AB+",
        HouseNo: "H.no.168",
        Colony: "Gandhi Nagar",
        city: "Jammu",
        state: "J&k",
        country: "India",
        pincode: "180007",
        image: "/assests/images/uploads/customers.png",
        createdAt: "2023-10-13T05:25:14.687Z",
        updatedAt: "2024-01-19T09:19:34.377Z",
        user: {
          Id: "07dc0c17-b482-4910-9c88-875edecf7131",
          firstName: "Anjali ",
          lastName: "Gupta",
          email: "falgun.mahajan@avi.software",
          contactNumber: "4654656356",
          password:
            "$2a$10$0Ke5l5.c9qKA2SGt2Cg9a.duF7ZKtuAm/zxmH2b6w2Pq118y8aEFC",
          gender: "female",
          role: "patient",
          enabled: true,
          deleted: false,
          createdAt: "2023-10-13T05:25:14.677Z",
          updatedAt: "2024-01-11T08:13:55.500Z",
        },
      },
      slot: {
        Id: "21c2032c-3a12-434e-901e-c866849ff443",
        startTime: "2024-01-20T05:30:00.000Z",
        endTime: "2024-01-20T06:00:00.000Z",
        doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        hospitalId: "8793d63c-79a4-46f2-9a59-f872390d8567",
        deleted: false,
        size: 2,
        count: 2,
        createdAt: "2024-01-17T05:07:29.076Z",
        updatedAt: "2024-01-19T09:34:43.375Z",
      },
    },
    {
      Id: "eddecf81-f6ef-47d2-8c7e-5ca67e805131",
      patientId: "459b9589-7c4d-4e6a-beff-efee90cdd744",
      doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
      slotId: "21c2032c-3a12-434e-901e-c866849ff443",
      appointmentStatus: "Not Started",
      otherName: null,
      otherMobileNumber: null,
      createdAt: "2024-01-19T09:34:43.379Z",
      updatedAt: "2024-01-19T09:34:43.379Z",
      patient: {
        Id: "459b9589-7c4d-4e6a-beff-efee90cdd744",
        userId: "07dc0c17-b482-4910-9c88-875edecf7131",
        dob: "1994-05-11",
        BloodGroup: "AB+",
        HouseNo: "H.no.168",
        Colony: "Gandhi Nagar",
        city: "Jammu",
        state: "J&k",
        country: "India",
        pincode: "180007",
        image: "/assests/images/uploads/customers.png",
        createdAt: "2023-10-13T05:25:14.687Z",
        updatedAt: "2024-01-19T09:19:34.377Z",
        user: {
          Id: "07dc0c17-b482-4910-9c88-875edecf7131",
          firstName: "Anjali ",
          lastName: "Gupta",
          email: "falgun.mahajan@avi.software",
          contactNumber: "4654656356",
          password:
            "$2a$10$0Ke5l5.c9qKA2SGt2Cg9a.duF7ZKtuAm/zxmH2b6w2Pq118y8aEFC",
          gender: "female",
          role: "patient",
          enabled: true,
          deleted: false,
          createdAt: "2023-10-13T05:25:14.677Z",
          updatedAt: "2024-01-11T08:13:55.500Z",
        },
      },
      slot: {
        Id: "21c2032c-3a12-434e-901e-c866849ff443",
        startTime: "2024-01-20T05:30:00.000Z",
        endTime: "2024-01-20T06:00:00.000Z",
        doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        hospitalId: "8793d63c-79a4-46f2-9a59-f872390d8567",
        deleted: false,
        size: 2,
        count: 2,
        createdAt: "2024-01-17T05:07:29.076Z",
        updatedAt: "2024-01-19T09:34:43.375Z",
      },
    },
  ];
  let createStub: SinonStub;
  let findStub: SinonStub;
  let deleteStub: SinonStub;
  let tokenStub:SinonStub;
  let paymentIntentStub:SinonStub;
  let patientStub:SinonStub
  afterEach(() => {
    if (createStub) createStub.restore();
    if (findStub) findStub.restore();
    if (deleteStub) deleteStub.restore();
    if (tokenStub) tokenStub.restore();
    if (paymentIntentStub) paymentIntentStub.restore();
    if (patientStub) patientStub.restore();
  });
  after(() => {
    server.close();
  });
  it("should delete the slots", (done) => {
    deleteStub = sinon.stub(appointment, "destroy").resolves(1);
    chai
      .request(server)
      .delete(
        "/appointments?appointmentId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should get the slots by doctorId", (done) => {
    findStub = sinon.stub(appointment, "findAll").resolves(appointmentData);
    chai
      .request(server)
      .get("/appointments?doctorId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(appointmentData);
        done();
      });
  });
  it("should get the slots by patientId", (done) => {
    findStub = sinon.stub(appointment, "findAll").resolves(appointmentData);
    chai
      .request(server)
      .get("/appointments?patientId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(appointmentData);
        done();
      });
  });
  it("should return error while getting appointments",(done)=>{
    findStub=sinon.stub(appointment,"findAll").rejects()
    chai.request(server).get("/appointments?patientId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8").end((err,res)=>{
       expect(res).to.have.status(500)
       expect(res.body).to.deep.equal({ message: 'Something went wrong' })
       done();
    })
   })
  it("should create slots",(done)=>{
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
  tokenStub=sinon.stub(stripe.tokens,"create")
  paymentIntentStub=sinon.stub(stripe.paymentIntents,"create")
  findStub=sinon.stub(slots,"findOne")
  createStub=sinon.stub(appointment,"create")
  tokenStub=sinon.stub(jwt,"verify").returns({
    "Id": "07dc0c17-b482-4910-9c88-875edecf7131",
    "email": "falgun.mahajan@avi.software",});
  patientStub=sinon.stub(patient,"findOne").resolves(userData);
  const tokenStr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3ZGMwYzE3LWI0ODItNDkxMC05Yzg4LTg3NWVkZWNmNzEzMSIsImVtYWlsIjoiZmFsZ3VuLm1haGFqYW5AYXZpLnNvZnR3YXJlIiwiaWF0IjoxNzAyNTM3NDk2LCJleHAiOjE3MDI3MTAyOTZ9.nGZXeml4KmJjFdfED4AU_tMse68BUs2VOBdIgYMhoHA"
  chai.request(server).post("/payment").set("Authorization",tokenStr).send({
    cardNumber:"4242424242424221",
    cvv:"2423",
    expiryDate:"01-2024",
    doctorId:"09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8",
    slotId:"09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8",
    consultancyPrice:250,

  }).end((err,res)=>{
    // expect(res).to.have.status(300)
    expect(res.body).to.deep.equal("hello")
    done()
  }) 
  })
});
