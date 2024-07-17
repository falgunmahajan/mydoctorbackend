
import {Sequelize} from "sequelize"
export const sequelize = new Sequelize("My Doctors", "postgres", "falgunmahajan", {
    host: "localhost",
    dialect: "postgres",
    logging:false
  });
