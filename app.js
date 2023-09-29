require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { route } = require("./routes/route");
const { sequelize } = require("./database");
const { user } = require("./models/users");
const { hospital } = require("./models/hospital");
const { speciality } = require("./models/speciality");
const app = express();
// mongoose.connect(process.env.DbUrl).then(()=>console.log("Database Successfully connected"))

const server=app.listen(process.env.PORT, () => {
  console.log(`The app is listening at ${process.env.PORT}`);
});

sequelize.authenticate().then(() => {
  console.log("Database Successfully connected");
});
user.sync().then(()=>{
    console.log("User model is created")
})
hospital.sync().then(()=>{
  console.log("Hospital model is created")
})
speciality.sync().then(()=>{
  console.log("Speciality model is created")
})


app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use("", route)

module.exports={app,server};
