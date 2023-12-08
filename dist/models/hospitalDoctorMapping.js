"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalDoctorMapping = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const doctors_1 = require("./doctors");
const hospital_1 = require("./hospital");
exports.hospitalDoctorMapping = database_1.sequelize.define("hospitalDoctorMapping", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false // Or DataTypes.UUIDV1
    },
    hospitalId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: hospital_1.hospital,
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
    consultationFee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
doctors_1.doctors.belongsToMany(hospital_1.hospital, { through: exports.hospitalDoctorMapping });
hospital_1.hospital.belongsToMany(doctors_1.doctors, { through: exports.hospitalDoctorMapping });
