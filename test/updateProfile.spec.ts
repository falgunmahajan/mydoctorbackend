import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";
import sinon, { SinonStub } from "sinon";
import { patient } from "../src/models/patient";
import fs from "fs";
import { doctors } from "../src/models/doctors";
import { doctorSpecialityMapping } from "../src/models/doctorSpecialityMapping";
import { hospitalDoctorMapping } from "../src/models/hospitalDoctorMapping";
chai.use(chaiHttp);
describe("Update Profile Api Testing", () => {
  let stub: SinonStub;
  let stub1: SinonStub;
  let stub2: SinonStub;
  let stub3: SinonStub;
  let stub4: SinonStub;
  afterEach(() => {
    if (stub) stub.restore();
    if (stub1) stub1.restore();
    if (stub2) stub2.restore();
    if (stub3) stub3.restore();
    if (stub4) stub4.restore();
  });
  after(() => {
    server.close();
  });
  const patientData: any = {
    userId: "ad9f2f72-4da8-4b28-813b-959615dae476",
    dob: "13-08-97",
    BloodGroup: "B+",
    HouseNo: "123",
    Colony: "Gandhi Nagar",
    city: "Jammu",
    state: "J&K",
    country: "India",
    pincode: "180002",
  };
  const doctorData: any = {
    userId: "ad9f2f72-4da8-4b28-813b-959615dae476",
    language: [
      { name: "English (India)", code: "en-IN" },
      { name: "Hindi - हिन्दी", code: "hi" },
    ],
    bio: "Hello this is doctor",
  };
  const doctorExperience = {
    doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
    userId: "b07188c7-1ffe-481f-8d88-31d225844607",
    experience: [
      {
        position: "Psychiatrist",
        hospitalName: "abc hospital",
        startDate: "2017-05",
        endDate: "2021-08",
      },
    ],
    licenceNumber: "hgdhef",
    specialities: [
      {
        name: "Child & Adolescent Psychiatry",
        Id: "44161e14-1a21-4449-835b-782e58bf0b33",
      },
      { name: "Cosmetology", Id: "8d607e37-473e-4495-b629-69b3bbcb73d7" },
      {
        name: "Cardiac Surgery",
        Id: "682dba3c-0e36-4de0-8d9b-c99c43ccaa42",
      },
      { name: "Cardiology", Id: "bcbabe8c-0538-43fb-9a58-7d3c461c87d1" },
    ],
  };
  const doctorProfile= {
    doctorId:"682dba3c-0e36-4de0-8d9b-c99c43ccaa42",
    profile:JSON.stringify([
      {
        position: 'Physician',
        hospital: {
          Id: '8793d63c-79a4-46f2-9a59-f872390d8567',
          hospitalName: 'Abc hospital'
        },
        consultationFee: 200
      },
      {
        position: 'Physician',
        hospital: {
          Id: 'e96c43a9-d405-42b8-b296-8c4b9742bd23',
          hospitalName: 'Xyz Hospital'
        },
        consultationFee: 300
      }
    ])
  }
  let record:any={
    id:"62cc287e-837b-4d50-8c4b-f665eee9992a",
    hospitalId:"8793d63c-79a4-46f2-9a59-f872390d8567",
    doctorId:"64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
    consultationFee:"200",
    position:"Physician"
  }
  it("updates the patient profile ", (done) => {
    stub = sinon.stub(patient, "update").resolves([1]);
    chai
      .request(server)
      .put("/updateProfile/patient")
      .set("content-type", "multipart/form-data")
      .field("userId", patientData.userId)
      .field("dob", patientData.dob)
      .field("BloodGroup", patientData.BloodGroup)
      .field("HouseNo", patientData.HouseNo)
      .field("Colony", patientData.Colony)
      .field("city", patientData.city)
      .field("state", patientData.state)
      .field("country", patientData.country)
      .field("pincode", patientData.pincode)
      .attach(
        "image",
        fs.readFileSync("public/assests/images/uploads/mehndiartist.jpg"),
        "mehndiartist.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("does not update the patient profile ", (done) => {
    stub = sinon.stub(patient, "update").rejects();
    chai
      .request(server)
      .put("/updateProfile/patient")
      .set("content-type", "multipart/form-data")
      .field("userId", patientData.userId)
      .field("dob", patientData.dob)
      .field("BloodGroup", patientData.BloodGroup)
      .field("HouseNo", patientData.HouseNo)
      .field("Colony", patientData.Colony)
      .field("city", patientData.city)
      .field("state", patientData.state)
      .field("country", patientData.country)
      .field("pincode", patientData.pincode)
      .attach(
        "image",
        fs.readFileSync("public/assests/images/uploads/mehndiartist.jpg"),
        "mehndiartist.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ message: "Something went wrong" });
        done();
      });
  });
  it("updates the doctor personal profile", (done) => {
    stub = sinon.stub(doctors, "update").resolves([1]);
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .set("content-type", "multipart/form-data")
      .field("userId", doctorData.userId)
      .field("languages", JSON.stringify(doctorData.language))
      .field("bio", doctorData.bio)
      .attach(
        "image",
        fs.readFileSync("public/assests/images/uploads/mehndiartist.jpg"),
        "mehndiartist.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({ message: "Your data is updated" });
        done();
      });
  });
  it("does not update the doctor personal profile", (done) => {
    stub = sinon.stub(doctors, "update").rejects();
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .set("content-type", "multipart/form-data")
      .field("userId", doctorData.userId)
      .field("languages", JSON.stringify(doctorData.language))
      .field("bio", doctorData.bio)
      .attach(
        "image",
        fs.readFileSync("public/assests/images/uploads/mehndiartist.jpg"),
        "mehndiartist.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ message: "Something went wrong" });
        done();
      });
  });
  it("updates the doctor experience", (done) => {
    stub = sinon.stub(doctors, "update").resolves([1]);
    stub1 = sinon.stub(doctorSpecialityMapping, "findOne").resolves();
    stub2 = sinon.stub(doctorSpecialityMapping, "create").resolves();
    stub3 = sinon.stub(doctorSpecialityMapping, "destroy").resolves();
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .send(doctorExperience)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({ message: "Your data is updated" });
        done();
      });
  });
  it("does not update the doctor experience", (done) => {
    stub = sinon.stub(doctors, "update").rejects();
    stub1 = sinon.stub(doctorSpecialityMapping, "findOne").rejects();
    stub2 = sinon.stub(doctorSpecialityMapping, "create").rejects();
    stub3 = sinon.stub(doctorSpecialityMapping, "destroy").rejects();
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .send(doctorExperience)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ message: "Something went wrong" });
        done();
      });
  });
  it("create the doctor professional profile", (done) => {
    stub1 = sinon.stub(hospitalDoctorMapping, "findOne").resolves();
    stub2 = sinon.stub(hospitalDoctorMapping, "create").resolves();
    stub3 = sinon.stub(hospitalDoctorMapping, "destroy").resolves();
    stub4 = sinon.stub(hospitalDoctorMapping, "update").resolves();
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .send(doctorProfile)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({ message: "Your data is updated" });
        done();
      });
  });
  it("update the doctor professional profile", (done) => {
   
    stub1 = sinon.stub(hospitalDoctorMapping, "findOne").resolves(record)
    stub2 = sinon.stub(hospitalDoctorMapping, "create").resolves();
    stub3 = sinon.stub(hospitalDoctorMapping, "destroy").resolves();
    stub4 = sinon.stub(hospitalDoctorMapping, "update").resolves();
    chai
      .request(server)
      .put("/updateProfile/doctor")
      .send(doctorProfile)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({ message: "Your data is updated" });
        done();
      });
  });
 
  
});
