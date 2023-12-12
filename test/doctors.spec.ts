import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { doctors } from "../src/models/doctors";
import { server } from "../src/app";
import { user } from "../src/models/users";
chai.use(chaiHttp);
describe("Doctors Api Testing", () => {
  let stub: SinonStub;
  afterEach(() => {
    if (stub) stub.restore();
  });

  after(() => {
    server.close();
  });
  it("should get all the doctors", (done) => {
    const doctorsList: any = [
      {
        Id: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        userId: "b07188c7-1ffe-481f-8d88-31d225844607",
        languages: [
          {
            name: "English (India)",
            code: "en-IN",
          },
          {
            name: "Hindi - हिन्दी",
            code: "hi",
          },
        ],
        bio: "Hello This is Doctor.",
        image: "/assests/images/uploads/invitation.jpeg",
        Qualification: [
          {
            degree: "Phd",
            institute: "abc institute",
            year: "1995",
          },
        ],
        licenceNumber: "hgdhef",
        experience: [
          {
            position: "Psychiatrist",
            hospitalName: "abc hospital",
            startDate: "2017-05",
            endDate: "2021-08",
          },
        ],
        createdAt: "2023-10-16T08:22:40.562Z",
        updatedAt: "2023-11-08T04:34:24.637Z",
        user: {
          Id: "b07188c7-1ffe-481f-8d88-31d225844607",
          firstName: "Dr. Falgun ",
          lastName: "Mahajan",
          email: "falgunmahajan1999@gmail.com",
          contactNumber: "4234642665",
          password:
            "$2a$10$1QhAVLfcNv2HbSQKrVX0yOv7ccyiY/qu4XxyxNypBG3/jn93peQLG",
          gender: "male",
          role: "doctor",
          enabled: true,
          deleted: false,
          createdAt: "2023-10-16T08:22:40.502Z",
          updatedAt: "2023-10-16T08:22:40.502Z",
        },
        specialities: [
          {
            Id: "44161e14-1a21-4449-835b-782e58bf0b33",
            name: "Child & Adolescent Psychiatry",
            enabled: true,
            reviewed: true,
            deleted: false,
            imageUrl:
              "/assests/images/specialities/c/child & adolescent psychiatry.svg",
            createdAt: "2023-10-04T05:40:39.691Z",
            updatedAt: "2023-10-04T05:40:39.691Z",
            doctorSpecialityMapping: {
              Id: "4a5aa7be-1594-4ad3-af62-7a195085e0cd",
              doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
              specialityId: "44161e14-1a21-4449-835b-782e58bf0b33",
              createdAt: "2023-10-21T06:25:25.331Z",
              updatedAt: "2023-10-21T06:25:25.331Z",
            },
          },
          {
            Id: "8d607e37-473e-4495-b629-69b3bbcb73d7",
            name: "Cosmetology",
            enabled: true,
            reviewed: true,
            deleted: false,
            imageUrl: "/assests/images/specialities/c/cosmetology.svg",
            createdAt: "2023-10-04T05:40:39.691Z",
            updatedAt: "2023-10-04T05:40:39.691Z",
            doctorSpecialityMapping: {
              Id: "d389075d-768f-4b56-9cc5-71cd00add0c3",
              doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
              specialityId: "8d607e37-473e-4495-b629-69b3bbcb73d7",
              createdAt: "2023-10-21T06:25:32.611Z",
              updatedAt: "2023-10-21T06:25:32.611Z",
            },
          },
          {
            Id: "682dba3c-0e36-4de0-8d9b-c99c43ccaa42",
            name: "Cardiac Surgery",
            enabled: true,
            reviewed: true,
            deleted: false,
            imageUrl: "/assests/images/specialities/c/cardiac surgery.svg",
            createdAt: "2023-10-04T05:40:39.690Z",
            updatedAt: "2023-10-04T05:40:39.690Z",
            doctorSpecialityMapping: {
              Id: "6f199649-4693-485a-9625-2e237e412ebe",
              doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
              specialityId: "682dba3c-0e36-4de0-8d9b-c99c43ccaa42",
              createdAt: "2023-11-08T04:34:24.646Z",
              updatedAt: "2023-11-08T04:34:24.646Z",
            },
          },
        ],
        hospitals: [
          {
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
            hospitalDoctorMapping: {
              Id: "62cc287e-837b-4d50-8c4b-f665eee9992a",
              hospitalId: "8793d63c-79a4-46f2-9a59-f872390d8567",
              doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
              consultationFee: 200,
              position: "Physician",
              createdAt: "2023-11-08T04:33:17.034Z",
              updatedAt: "2023-11-08T04:33:17.034Z",
            },
          },
          {
            Id: "e96c43a9-d405-42b8-b296-8c4b9742bd23",
            hospitalName: "Xyz Hospital",
            email: "xyz@gmail.com",
            contactNumber: "5436537858",
            password:
              "$2a$10$fBGV8hp/b4BKTOdY6m7INe.tx5k2qbM96lALcdCJweDxshpCkYt66",
            location: "Bakshi Nagar",
            enabled: true,
            deleted: false,
            createdAt: "2023-10-21T07:46:12.374Z",
            updatedAt: "2023-10-21T07:46:12.374Z",
            hospitalDoctorMapping: {
              Id: "812c72c4-2e3f-42cb-9281-1b16a4aab56c",
              hospitalId: "e96c43a9-d405-42b8-b296-8c4b9742bd23",
              doctorId: "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
              consultationFee: 300,
              position: "Physician",
              createdAt: "2023-10-21T11:27:43.404Z",
              updatedAt: "2023-11-08T04:33:17.032Z",
            },
          },
        ],
      },
      {
        Id: "f177bf36-560d-4a9a-ae24-bd1eb1b90659",
        userId: "d6ba08b2-0ab6-4a28-bf56-c3bc074dcfe5",
        languages: null,
        bio: null,
        image: null,
        Qualification: null,
        licenceNumber: null,
        experience: null,
        createdAt: "2023-11-08T04:39:51.088Z",
        updatedAt: "2023-11-08T04:39:51.088Z",
        user: {
          Id: "d6ba08b2-0ab6-4a28-bf56-c3bc074dcfe5",
          firstName: "Dr. abc ",
          lastName: "def",
          email: "abc@gmail.com",
          contactNumber: "5675728413",
          password:
            "$2a$10$fs/cWCihGOv9JS0n/42sAedi5TV0ZS6tloGr2T8fN0duPRYHGCiJW",
          gender: "male",
          role: "doctor",
          enabled: true,
          deleted: false,
          createdAt: "2023-11-08T04:39:51.041Z",
          updatedAt: "2023-11-08T04:39:51.041Z",
        },
        specialities: [],
        hospitals: [],
      },
      {
        Id: "80d54172-197f-4666-bacb-86e5d6baa0c0",
        userId: "ad9f2f72-4da8-4b28-813b-959615dae476",
        languages: null,
        bio: null,
        image: null,
        Qualification: null,
        licenceNumber: null,
        experience: null,
        createdAt: "2023-11-08T04:50:27.260Z",
        updatedAt: "2023-11-08T04:50:27.260Z",
        user: {
          Id: "ad9f2f72-4da8-4b28-813b-959615dae476",
          firstName: "Dr. abc def ",
          lastName: "ghi",
          email: "ghi@gmail.com",
          contactNumber: "7385387892",
          password:
            "$2a$10$mWuJ/BjN7.jGAdS/nD2dGuQpFcZdq.L1fDojnDxv08Ig3Q0DzCjQS",
          gender: "male",
          role: "doctor",
          enabled: true,
          deleted: false,
          createdAt: "2023-11-08T04:50:27.257Z",
          updatedAt: "2023-11-08T04:50:27.257Z",
        },
        specialities: [],
        hospitals: [],
      },
    ];
    sinon.stub(doctors, "findAll").resolves(doctorsList);
    chai
      .request(server)
      .get("/doctors")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(doctorsList);
      });
    done();
  });
  it("should register all the doctors", (done) => {
    const doctorsList: any = {
      Id: "ad9f2f72-4da8-4b28-813b-959615dae476",
      firstName: "Dr. abc def ",
      lastName: "ghi",
      email: "ghi@gmail.com",
      contactNumber: "7385387892",
      password: "$2a$10$mWuJ/BjN7.jGAdS/nD2dGuQpFcZdq.L1fDojnDxv08Ig3Q0DzCjQS",
      gender: "male",
      role: "doctor",
      enabled: true,
      deleted: false,
      createdAt: "2023-11-08T04:50:27.257Z",
      updatedAt: "2023-11-08T04:50:27.257Z",
    };
    const doctor = {
      firstName: "Dr. abc def ",
      lastName: "ghi",
      email: "ghi@gmail.com",
      contactNumber: "7385387892",
      password: "$2a$10$mWuJ/BjN7.jGAdS/nD2dGuQpFcZdq.L1fDojnDxv08Ig3Q0DzCjQS",
      gender: "male",
    };
    stub = sinon.stub(user, "create").resolves(doctorsList);
    sinon.stub(doctors, "create");
    chai
      .request(server)
      .post("/doctor")
      .send(doctor)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(doctorsList);
      });
    done();
  });
});
