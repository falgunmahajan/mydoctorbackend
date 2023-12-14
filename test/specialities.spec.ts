import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { speciality } from "../src/models/speciality";
import { server } from "../src/app";
import sinon, { SinonStub } from "sinon";

chai.use(chaiHttp);


describe("Specialities Api Testing", () => {
  let createStub:SinonStub
  let findStub:SinonStub
  afterEach(()=>{
    if(createStub) createStub.restore()
    if(findStub) findStub.restore()
  })
  after(() => {
    server.close();
  });
  it("should get all the specialities", (done) => {
    const specialities: any = [
      {
        Id: "a03c5530-850e-4957-b0a3-d90c839d4911",
        name: "Endocrinology & Diabetology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/e/endocrinology & diabetology.svg",
        createdAt: "2023-10-04T05:40:39.690Z",
        updatedAt: "2023-10-04T05:40:39.690Z",
      },
      {
        Id: "5978d19a-5ba6-408f-8ae4-2ca986c203e7",
        name: "Breast & Oncoplastic - Oncology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl:
          "/assests/images/specialities/b/breast & oncoplastic - oncology.svg",
        createdAt: "2023-10-04T05:40:39.689Z",
        updatedAt: "2023-10-04T05:40:39.689Z",
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
      },
      {
        Id: "bcbabe8c-0538-43fb-9a58-7d3c461c87d1",
        name: "Cardiology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/c/cardiology.svg",
        createdAt: "2023-10-04T05:40:39.690Z",
        updatedAt: "2023-10-04T05:40:39.690Z",
      },
      {
        Id: "2c44a226-1283-4664-85a5-a41da56052bd",
        name: "E.N.T",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/e/e.n.t.svg",
        createdAt: "2023-10-04T05:40:39.691Z",
        updatedAt: "2023-10-04T05:40:39.691Z",
      },
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
      },
      {
        Id: "dc931b26-f2c6-48ec-8982-2eb52ce302a1",
        name: "Clinical Psychology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/c/clinical psychology.svg",
        createdAt: "2023-10-04T05:40:39.691Z",
        updatedAt: "2023-10-04T05:40:39.691Z",
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
      },
      {
        Id: "3df71e6e-207e-40bb-8262-761c7ed61d51",
        name: "Dermatology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/d/dermatology.svg",
        createdAt: "2023-10-04T05:40:39.691Z",
        updatedAt: "2023-10-04T05:40:39.691Z",
      },
      {
        Id: "98346d03-f77b-41b9-b242-53821ce881bd",
        name: "Development Behavioral Pediatrics",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl:
          "/assests/images/specialities/d/development behavioral pediatrics.svg",
        createdAt: "2023-10-04T05:40:39.691Z",
        updatedAt: "2023-10-04T05:40:39.691Z",
      },
      {
        Id: "9298a5bf-cd2a-4074-8358-fb207ba1cafb",
        name: "Clinical Nutrition & Dietetics",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl:
          "/assests/images/specialities/c/clinical nutrition & dietetics.svg",
        createdAt: "2023-10-04T05:40:39.691Z",
        updatedAt: "2023-10-04T05:40:39.691Z",
      },
      {
        Id: "f44b881a-fd82-42bd-8eeb-7283930fb7fb",
        name: "Gastroenterology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/g/gastroenterology.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "6acdc7b9-32dd-4ecc-a778-901ab35c8dec",
        name: "Audiology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/a/audiology.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "3c142f96-f619-4ec1-bc30-fd5f6d89c32e",
        name: "Diabetology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/d/diabetology.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "b93c3529-51ef-4dc6-9920-bd25031b5982",
        name: "Anethesiology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/a/anesthesiology.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "7236c971-fcb3-4f64-8bf6-6802960d9a8a",
        name: "Bone Marrow",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/b/bone marrow.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "a7a607ed-6d53-4b3e-8645-54acea62e659",
        name: "Cranio-Maxillo Facial Surgery",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl:
          "/assests/images/specialities/c/cranio-maxillo facial surgery.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "a5fca4f3-08ab-4dea-bdc3-bfe90cbd1d25",
        name: "Critical Care Medicine",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/c/critical care medicine.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "89c3cda0-67b8-4e18-ba86-4d4671da0b35",
        name: "Dental",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/d/dental.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
      {
        Id: "04a2566b-3a52-469d-8e6a-182c72fee477",
        name: "Emergency Medicine",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/e/emergency medicine.svg",
        createdAt: "2023-10-04T05:40:39.692Z",
        updatedAt: "2023-10-04T05:40:39.692Z",
      },
    ];
   findStub= sinon.stub(speciality, "findAll").resolves(specialities);
    chai
      .request(server)
      .get("/specializations")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          total: specialities.length,
          data: specialities,
        });
        done();
      });
      
  });
  it("should get the specialities using query", (done) => {
    let specialities:any=[
      {
        Id: "682dba3c-0e36-4de0-8d9b-c99c43ccaa42",
        name: "Cardiac Surgery",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/c/cardiac surgery.svg",
        createdAt: "2023-10-04T05:40:39.690Z",
        updatedAt: "2023-10-04T05:40:39.690Z",
      },
      {
        Id: "bcbabe8c-0538-43fb-9a58-7d3c461c87d1",
        name: "Cardiology",
        enabled: true,
        reviewed: true,
        deleted: false,
        imageUrl: "/assests/images/specialities/c/cardiology.svg",
        createdAt: "2023-10-04T05:40:39.690Z",
        updatedAt: "2023-10-04T05:40:39.690Z",
      },
    ]
   findStub= sinon.stub(speciality, "findAll").resolves(specialities);
    chai
      .request(server)
      .get("/specializations?name=cardi")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          total: specialities.length,
          data: specialities,
        });
        done();
      });
     
  });
  it("should post the specialities", (done) => {
    const postingSpeciality = [
      {
        name: "Endocrinology & Diabetology",
        imageUrl:
          "/assests/images/specialities/e/endocrinology & diabetology.svg",
      },
      {
        name: "Breast & Oncoplastic - Oncology",

        imageUrl:
          "/assests/images/specialities/b/breast & oncoplastic - oncology.svg",
      },
      {
        name: "Cardiac Surgery",

        imageUrl: "/assests/images/specialities/c/cardiac surgery.svg",
      },
      {
        name: "Cardiology",

        imageUrl: "/assests/images/specialities/c/cardiology.svg",
      },
      {
        name: "E.N.T",

        imageUrl: "/assests/images/specialities/e/e.n.t.svg",
      },
      {
        name: "Child & Adolescent Psychiatry",

        imageUrl:
          "/assests/images/specialities/c/child & adolescent psychiatry.svg",
      },
      {
        name: "Clinical Psychology",

        imageUrl: "/assests/images/specialities/c/clinical psychology.svg",
      },
      {
        name: "Cosmetology",
        imageUrl: "/assests/images/specialities/c/cosmetology.svg",
      },
      {
        name: "Dermatology",
        imageUrl: "/assests/images/specialities/d/dermatology.svg",
      },
      {
        name: "Development Behavioral Pediatrics",
        imageUrl:
          "/assests/images/specialities/d/development behavioral pediatrics.svg",
      },
      {
        name: "Clinical Nutrition & Dietetics",
        imageUrl:
          "/assests/images/specialities/c/clinical nutrition & dietetics.svg",
      },
      {
        name: "Gastroenterology",
        imageUrl: "/assests/images/specialities/g/gastroenterology.svg",
      },
      {
        name: "Audiology",
        imageUrl: "/assests/images/specialities/a/audiology.svg",
      },
      {
        name: "Diabetology",
        imageUrl: "/assests/images/specialities/d/diabetology.svg",
      },
      {
        name: "Anethesiology",

        imageUrl: "/assests/images/specialities/a/anesthesiology.svg",
      },
      {
        name: "Bone Marrow",
        imageUrl: "/assests/images/specialities/b/bone marrow.svg",
      },
      {
        name: "Cranio-Maxillo Facial Surgery",
        imageUrl:
          "/assests/images/specialities/c/cranio-maxillo facial surgery.svg",
      },
      {
        name: "Critical Care Medicine",
        imageUrl: "/assests/images/specialities/c/critical care medicine.svg",
      },
      {
        name: "Dental",

        imageUrl: "/assests/images/specialities/d/dental.svg",
      },
      {
        name: "Emergency Medicine",
        imageUrl: "/assests/images/specialities/e/emergency medicine.svg",
      },
    ];
    createStub= sinon.stub(speciality, "create");
    chai
      .request(server)
      .post("/speciality")
      .send(postingSpeciality)
      .end((err, res) => {
        expect(res).to.have.status(201);
       
        done();
      });
     
      
  });
});
