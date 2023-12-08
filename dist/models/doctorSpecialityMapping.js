"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorSpecialityMapping = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const doctors_1 = require("./doctors");
const speciality_1 = require("./speciality");
exports.doctorSpecialityMapping = database_1.sequelize.define("doctorSpecialityMapping", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false // Or DataTypes.UUIDV1
    },
    doctorId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: doctors_1.doctors,
            key: "Id",
        },
    },
    specialityId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: speciality_1.speciality,
            key: "Id",
        },
    }
});
doctors_1.doctors.belongsToMany(speciality_1.speciality, { through: exports.doctorSpecialityMapping });
speciality_1.speciality.belongsToMany(doctors_1.doctors, { through: exports.doctorSpecialityMapping });
