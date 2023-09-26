require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { route } = require("./routes/route");
const { sequelize } = require("./database");
const { patient } = require("./models/patient");
const app = express();
// mongoose.connect(process.env.DbUrl).then(()=>console.log("Database Successfully connected"))

app.listen(process.env.PORT, () => {
  console.log(`The app is listening at ${process.env.PORT}`);
});

sequelize.authenticate().then(() => {
  console.log("Database Successfully connected");
});
patient.sync().then(()=>{
    console.log("Patient model is created")
})

app.use(cors())
app.use(express.json())
app.use("", route)
