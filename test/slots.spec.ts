import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { server } from "../src/app";
import { slots } from "../src/models/slots";
const slotData: any = {
  booked: true,
  doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
  hospitalId: "b07188c7-1ffe-481f-8d88-31d225844607",
  size: 2,
  startTime: "2024-01-20T10:30:00.000Z",
  endTime: "2024-01-20T11:00:00.000Z",
};
chai.use(chaiHttp);
describe("Slots Api Testing", () => {
  let createStub: SinonStub;
  let findStub: SinonStub;
  let deleteStub: SinonStub;
  afterEach(() => {
    if (createStub) createStub.restore();
    if (findStub) findStub.restore();
    if (deleteStub) deleteStub.restore();
  });
  after(() => {
    server.close();
  });
  it("should create slots", (done) => {
    createStub = sinon.stub(slots, "create").resolves(slotData);
    chai
      .request(server)
      .post("/slots")
      .send(slotData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(slotData);
        done();
      });
  });
  it("should not create slots", (done) => {
    createStub = sinon.stub(slots, "create").rejects();
    chai
      .request(server)
      .post("/slots")
      .send(slotData)
      .end((err, res) => {
        expect(res).to.have.status(500);

        done();
      });
  });
  it("should get the slots of specified Date", (done) => {
    const slotsList: any = [
      {
        Id: "d5e105de-d9fe-459b-b06b-66d32c573c7d",
        startTime: "2024-01-13T06:30:00.000Z",
        endTime: "2024-01-13T07:00:00.000Z",
        doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        hospitalId: "8793d63c-79a4-46f2-9a59-f872390d8567",
        deleted: false,
        size: 2,
        count: 0,
        createdAt: "2024-01-11T05:54:33.903Z",
        updatedAt: "2024-01-11T05:54:33.903Z",
        hospital: {
          Id: "8793d63c-79a4-46f2-9a59-f872390d8567",
          hospitalName: "Abc hospital",
          email: "abc@gmail.com",
          contactNumber: "3465675737",
          password:
            "$2a$10$GioPKc0.7Y7UnlhXMzCHW.WOl7yMzw8hsAv6vej7a8.eop8ouP/ci",
          location: "Gandhi Nagar",
          enabled: true,
          deleted: false,
          createdAt: "2023-10-21T07:43:44.135Z",
          updatedAt: "2023-10-21T07:43:44.135Z",
        },
      },
    ];
    findStub = sinon.stub(slots, "findAll").resolves(slotsList);
    chai
      .request(server)
      .get("/slots?date=2024-01-20T10:30:00.000Z")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(slotsList);
        done();
      });
  });
  it("should return error while getting the slots of specified Date", (done) => {
    findStub = sinon.stub(slots, "findAll").rejects();
    chai
      .request(server)
      .get("/slots?date=2024-01-20T10:30:00.000Z")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ message: "Something went wrong" });
        done();
      });
  });
  it("should get the slots greater than the specified Date", (done) => {
    const slotsList: any = [
      {
        Id: "d5e105de-d9fe-459b-b06b-66d32c573c7d",
        startTime: "2024-01-13T06:30:00.000Z",
        endTime: "2024-01-13T07:00:00.000Z",
        doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        hospitalId: "8793d63c-79a4-46f2-9a59-f872390d8567",
        deleted: false,
        size: 2,
        count: 0,
        createdAt: "2024-01-11T05:54:33.903Z",
        updatedAt: "2024-01-11T05:54:33.903Z",
        hospital: {
          Id: "8793d63c-79a4-46f2-9a59-f872390d8567",
          hospitalName: "Abc hospital",
          email: "abc@gmail.com",
          contactNumber: "3465675737",
          password:
            "$2a$10$GioPKc0.7Y7UnlhXMzCHW.WOl7yMzw8hsAv6vej7a8.eop8ouP/ci",
          location: "Gandhi Nagar",
          enabled: true,
          deleted: false,
          createdAt: "2023-10-21T07:43:44.135Z",
          updatedAt: "2023-10-21T07:43:44.135Z",
        },
      },
    ];
    findStub = sinon.stub(slots, "findAll").resolves(slotsList);
    chai
      .request(server)
      .get("/slots?start=2024-01-20T10:30:00.000Z")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(slotsList);
        done();
      });
  });
  it("should return error while getting the slots greater than the specified Date", (done) => {
    findStub = sinon.stub(slots, "findAll").rejects();
    chai
      .request(server)
      .get("/slots?start=2024-01-20T10:30:00.000Z")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ message: "Something went wrong" });
        done();
      });
  });
  it("should delete the slots",(done)=>{
  deleteStub=sinon.stub(slots,"destroy").resolves(1)
  chai.request(server).delete("/slots?slotsId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8").end((err,res)=>{
  expect(res).to.have.status(200)
  expect(res.body).to.equal(1)
  done()
  })
  })
  it("should return error while deleting the slots",(done)=>{
    deleteStub=sinon.stub(slots,"destroy").rejects()
    chai.request(server).delete("/slots?slotsId=09b6b71a-e2cd-465f-88f4-c8d84a5ca0f8").end((err,res)=>{
    expect(res).to.have.status(500)
    expect(res.body).to.deep.equal({message:"Something went wrong"})
    done()
    })
    })
});
