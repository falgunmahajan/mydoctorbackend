"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospital = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const password_1 = require("../utils/password");
exports.hospital = database_1.sequelize.define('hospital', {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false // Or DataTypes.UUIDV1
    },
    hospitalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', (0, password_1.getHashPassword)(value));
        }
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
});
