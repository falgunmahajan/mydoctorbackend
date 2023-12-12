import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";

import { server } from "../src/app";
import { hospital } from "../src/models/hospital";
chai.use(chaiHttp);
describe("Hospitals Api Testing", () => {
  

  after(() => {
    server.close();
  });
  it("should get all the hospitals", (done) => {
    const hospitalList: any = [
        {
            "Id": "8793d63c-79a4-46f2-9a59-f872390d8567",
            "hospitalName": "Abc hospital",
            "email": "abc@gmail.com",
            "contactNumber": "3465675737",
            "password": "$2a$10$GioPKc0.7Y7UnlhXMzCHW.WOl7yMzw8hsAv6vej7a8.eop8ouP/ci",
            "location": "Gandhi Nagar",
            "enabled": true,
            "deleted": false,
            "createdAt": "2023-10-21T07:43:44.135Z",
            "updatedAt": "2023-10-21T07:43:44.135Z"
        },
        {
            "Id": "e96c43a9-d405-42b8-b296-8c4b9742bd23",
            "hospitalName": "Xyz Hospital",
            "email": "xyz@gmail.com",
            "contactNumber": "5436537858",
            "password": "$2a$10$fBGV8hp/b4BKTOdY6m7INe.tx5k2qbM96lALcdCJweDxshpCkYt66",
            "location": "Bakshi Nagar",
            "enabled": true,
            "deleted": false,
            "createdAt": "2023-10-21T07:46:12.374Z",
            "updatedAt": "2023-10-21T07:46:12.374Z"
        }
    ]
    
    sinon.stub(hospital, "findAll").resolves(hospitalList);
    chai
      .request(server)
      .get("/hospitals")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
            total:hospitalList.length,
            data:hospitalList
        });
      });
    done();
  });
  it("should register all the hospitals", (done) => {
    const hospitalList: any =    {
        "Id": "e96c43a9-d405-42b8-b296-8c4b9742bd23",
        "hospitalName": "Xyz Hospital",
        "email": "xyz@gmail.com",
        "contactNumber": "5436537858",
        "password": "$2a$10$fBGV8hp/b4BKTOdY6m7INe.tx5k2qbM96lALcdCJweDxshpCkYt66",
        "location": "Bakshi Nagar",
        "enabled": true,
        "deleted": false,
        "createdAt": "2023-10-21T07:46:12.374Z",
        "updatedAt": "2023-10-21T07:46:12.374Z"
    };
    const hospitalData = {
        "hospitalName": "Xyz Hospital",
        "email": "xyz@gmail.com",
        "contactNumber": "5436537858",
        "password": "$2a$10$fBGV8hp/b4BKTOdY6m7INe.tx5k2qbM96lALcdCJweDxshpCkYt66",
        "location": "Bakshi Nagar",
    };
    sinon.stub(hospital, "create").resolves(hospitalList);
    
    chai
      .request(server)
      .post("/hospital")
      .send(hospitalData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(hospitalList);
      });
    done();
  });
});
