"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slots = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const doctors_1 = require("./doctors");
exports.slots = database_1.sequelize.define("slot", {
    Id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    doctorId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: doctors_1.doctors,
            key: "Id"
        },
        allowNull: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
});
exports.slots.belongsTo(doctors_1.doctors);
