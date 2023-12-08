"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const password_1 = require("../utils/password");
exports.user = database_1.sequelize.define("user", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', (0, password_1.getHashPassword)(value));
        }
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM("male", "female", "others"),
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("admin", "doctor", "patient"),
        allowNull: false,
    },
    enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
