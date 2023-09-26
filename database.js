const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("My Doctors", "postgres", "mydoctor", {
    host: "localhost",
    dialect: "postgres",
  });
  module.exports={sequelize}