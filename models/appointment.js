const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { doctors } = require("./doctors");
const { patient } = require("./patient");
const { slots } = require("./slots");

const appointment=sequelize.define("appointments",{
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
      },
     patientId: {
        type: DataTypes.UUID,
        references: {
          model: patient,
          key: "Id",
        },
      },
      doctorId: {
        type: DataTypes.UUID,
        references: {
          model: doctors,
          key: "Id",
        },
      },
     slotsId: {
        type: DataTypes.UUID,
        references: {
          model: slots,
          key: "Id",
        },
      },
      appointmentStatus:{
        type:DataTypes.ENUM("notStarted","ongoing","completed","cancelled"),
        defaultValue:"notStarted"
      }
})
module.exports={appointment}