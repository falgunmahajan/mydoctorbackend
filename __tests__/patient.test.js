const supertest = require("supertest");

const { sequelize } = require("../database");
const { user } = require("../models/users");
const {app, server} = require("../app");
const req = supertest(app);

const object = {
  firstName: "Falgun",
  lastName: "Mahajan",
  gender: "female",
  profile: {
    dob: "1999-09-17",
  },
  role:"patient",
  email: "falgun@gmail.com",
  password: "Falgun12@",
  contactNumber: "6527386298",
};
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
describe("patient registered api",()=>{
    test("Is patient registered api work correctly", async () => {
        const res = await req.post("/patients").send(object);
        expect(res.status).toBe(201)
      });
      test("Is patient registered successfully", async () => {
        const res = await req.post("/patients").send(object);
        const registereduser = await user.findOne({where:{email:object.email}})
        expect(registereduser.email).toBeTruthy();
      });
})

