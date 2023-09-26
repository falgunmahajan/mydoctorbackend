const { Client } = require("pg");

const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"mydoctor"
})
client.on("connect",()=>{
    console.log("The database is connnected")
})
module.exports=client