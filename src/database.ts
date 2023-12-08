
import {Sequelize} from "sequelize"
export const sequelize = new Sequelize("My Doctors", "postgres", "mydoctor", {
    host: "localhost",
    dialect: "postgres",
    logging:false
  });
