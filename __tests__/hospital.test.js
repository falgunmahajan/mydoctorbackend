const supertest = require("supertest");

const { sequelize } = require("../database");

const {app, server} = require("../app");
const { hospital } = require("../models/hospital");
const req = supertest(app);

const object = {
  
  firstName: "Falgun",
  email: "falgun@gmail.com",
  password: "Falgun12@",
  contactNumber: "6527386298",
};
const hospitalId="aa5aea41-5125-4d85-85e6-2db7b23cfd53"
beforeAll(async () => {

  await sequelize.authenticate();
  
});
beforeEach(async()=>{
    await sequelize.sync({force:true})
})
afterEach(async()=>{
    await sequelize.sync({force:true})
    server.close()
})
describe("hospital registered api",()=>{
    test("Is hospital registered api work correctly", async () => {
        const res = await req.post("/hospital").send(object);
        expect(res.status).toBe(201)
      });
      test("Is hospital registered successfully", async () => {
        const res = await req.post("/hospital").send(object);
        const registereduser = await hospital.findOne({where:{email:object.email}})
        expect(registereduser.email).toBeTruthy();
      });
      test("Is hospital id is registered",async()=>{
        const res = await req.get(`/hospital/${hospitalId}`);
        const resp=await hospital.findOne({
            where:{
               Id:hospitalId
            }
        })
        if(resp){
            expect(res.status).toBe(200)
            expect(res.body).toEqual(resp)
        }
        else{
            expect(res.status).toBe(400)
            expect(res.body.msg).toEqual("Not Found")
        }
      })
})