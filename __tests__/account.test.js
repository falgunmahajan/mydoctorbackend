const supertest = require("supertest");

const { sequelize } = require("../database");

const {app, server} = require("../app");
const { hospital } = require("../models/hospital");
const { user } = require("../models/users");
const req = supertest(app);

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
describe("Unique account api",()=>{
    test("unique email for user exist",async()=>{
        const res=await req.get("/accounts/patient?email=falgunmahajan@gmail.com")
        const resp=await user.findOne({where:{
            email:"falgunmahajan@gmail.com"
        }})
        if(resp){
expect(res.status).toBe(433)
        }
        else{
            expect(res.status).toBe(200) 
        }
    })
    test("unique contact for user exist",async()=>{
        const res=await req.get("/accounts/hospital?contactNumber=3426437423")
        const resp=await hospital.findOne({where:{
            contactNumber:"3426437423"
        }})
        if(resp){
expect(res.status).toBe(433)
        }
        else{
            expect(res.status).toBe(200) 
        }
    })
})