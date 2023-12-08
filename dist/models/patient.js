"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patient = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const users_1 = require("./users");
exports.patient = database_1.sequelize.define("patient", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: users_1.user,
            key: "Id",
        },
    },
    dob: {
        type: sequelize_1.DataTypes.STRING,
    },
    BloodGroup: {
        type: sequelize_1.DataTypes.STRING,
    },
    HouseNo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Colony: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    pincode: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.patient.belongsTo(users_1.user);
