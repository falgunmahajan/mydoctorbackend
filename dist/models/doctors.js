"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctors = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const users_1 = require("./users");
exports.doctors = database_1.sequelize.define("doctor", {
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
    languages: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    Qualification: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
    },
    licenceNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    experience: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
    },
});
exports.doctors.belongsTo(users_1.user);
