const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const speciality = sequelize.define("speciality", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, // Or DataTypes.UUIDV1
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reviewed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports={speciality}
