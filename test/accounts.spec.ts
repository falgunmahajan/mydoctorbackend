import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon, { SinonStub } from "sinon";
import { server } from "../src/app";
import { user } from "../src/models/users";
import { hospital } from "../src/models/hospital";
chai.use(chaiHttp);
const userData:any={
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
  }

describe('Accounts Api Testing', () => {
    let stub: SinonStub;
    afterEach(() => {
      if (stub) stub.restore();
    });
    after(() => {
      server.close();
    });
  it("should have unique email of patient",(done)=>{
   stub= sinon.stub(user,"findOne");
    chai.request(server).get("/accounts/patient?email=abc@gmail.com").end((err,res)=>{
       
        expect(res).to.have.status(200)
        expect(res.body).to.deep.equal([])
        done();
    })
  })
  it("should not have unique email of patient",(done)=>{
   stub= sinon.stub(user,"findOne").returns(userData);
    chai.request(server).get("/accounts/patient?email=ghi@gmail.com").end((err,res)=>{
       
        expect(res).to.have.status(433)
        expect(res.body).to.deep.equal({
            "name": "account exists",
            "message": "account already exists for email: ghi@gmail.com",
            "code": 433,
            "className": "AccountExists",
            "errors": {}
        })
        done();
    })
  })
  it("should have unique contact of doctor",(done)=>{
    stub= sinon.stub(user,"findOne");
     chai.request(server).get("/accounts/doctor?contactNumber=7385387892").end((err,res)=>{
        
         expect(res).to.have.status(200)
         expect(res.body).to.deep.equal([])
         done();
     })
   })
   it("should not have unique contact of doctor",(done)=>{
    stub= sinon.stub(user,"findOne").returns(userData);
     chai.request(server).get("/accounts/doctor?contactNumber=7385389892").end((err,res)=>{
        
         expect(res).to.have.status(433)
         expect(res.body).to.deep.equal({
             "name": "account exists",
             "message": "account already exists for contactNumber: 7385389892",
             "code": 433,
             "className": "AccountExists",
             "errors": {}
         })
         done();
     })
   })
   it("should have unique email of hospital",(done)=>{
    stub= sinon.stub(hospital,"findOne");
     chai.request(server).get("/accounts/hospital?email=abc@gmail.com").end((err,res)=>{
        
         expect(res).to.have.status(200)
         expect(res.body).to.deep.equal([])
         done();
     })
   })
   it("should have unique contact of hospital",(done)=>{
    stub= sinon.stub(hospital,"findOne");
     chai.request(server).get("/accounts/hospital?contactNumber=7385387892").end((err,res)=>{
        
         expect(res).to.have.status(200)
         expect(res.body).to.deep.equal([])
         done();
     })
   })
})
