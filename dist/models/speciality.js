"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speciality = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.speciality = database_1.sequelize.define("speciality", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    reviewed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
