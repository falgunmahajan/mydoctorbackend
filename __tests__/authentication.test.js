const supertest = require("supertest");

const { sequelize } = require("../database");

const { app, server } = require("../app");
const { hospital } = require("../models/hospital");
const { user } = require("../models/users");
const { getToken } = require("../utils/jwt");
const req = supertest(app);

beforeAll(async () => {
  await sequelize.authenticate();
});
beforeEach(async () => {
  await sequelize.sync({ force: true });
});
afterEach(async () => {
  await sequelize.sync({ force: true });
  server.close();
});
const object = {
  email: "falgun@gmail.com",
  password: "Falgun17@",
};
describe("User authentication api", () => {
  test("Is user authenticated", async () => {
    const res = await req.post("/authentication").send(object);
    const resp = await user.findOne({
      where: {
        email: object.email,
      },
    });
    if (!resp) {
      expect(res.status).toBe(401);
    }

  });
});
