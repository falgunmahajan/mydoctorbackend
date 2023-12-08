"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const slots_1 = require("./slots");
const doctors_1 = require("./doctors");
const patient_1 = require("./patient");
exports.appointment = database_1.sequelize.define("appointments", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
    },
    patientId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: patient_1.patient,
            key: "Id",
        },
    },
    doctorId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: doctors_1.doctors,
            key: "Id",
        },
    },
    slotsId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: slots_1.slots,
            key: "Id",
        },
    },
    appointmentStatus: {
        type: sequelize_1.DataTypes.ENUM("notStarted", "ongoing", "completed", "cancelled"),
        defaultValue: "notStarted"
    }
});
