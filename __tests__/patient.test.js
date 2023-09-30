const supertest = require("supertest");

const { sequelize } = require("../database");
const { user } = require("../models/users");
const { app, server } = require("../app");
const { mockedUserDatabase, mock } = require("../models/testmodel");
const req = supertest(app);

beforeAll(async () => {
  await sequelize.authenticate();
  mock();
  mockedUserDatabase();
});
// beforeEach(async()=>{
//     await sequelize.sync({force:true})
// })
afterEach(async () => {
  // await sequelize.sync({force:true})
  server.close();
});
describe("patient registered api", () => {
  test("Is patient registered api work correctly", async () => {
    const res = await req.post("/patients").send({
      firstName: "Falgun",
      lastName: "Mahajan",
      gender: "female",
      profile: {
        dob: "1999-09-17",
      },
      role: "patient",
      email: "falgun@gmail.com",
      password: "Falgun12@",
      contactNumber: "6527386298",
    });
    expect(res.status).toBe(201);
    expect(res.body).toBe(res)
  });
 test("Is patient api gives an error",async()=>{
  const res = await req.post("/patients").send({
    firstName: "Falgun",
    lastName: "Mahajan",
    gender: "female",
    profile: {
      dob: "1999-09-17",
    },
    password: "Falgun12@",
    contactNumber: "6527386298",
  });
  expect(res.status).toBe(500);
 })
});
