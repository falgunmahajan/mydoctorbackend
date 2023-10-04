const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { user } = require("./users");

const patient = sequelize.define("patient", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, // Or DataTypes.UUIDV1
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: user,
      key: "Id",
    },
  },
  dob: {
    type: DataTypes.STRING,
  },
  BloodGroup: {
    type: DataTypes.STRING,
  },
  HouseNo: {
    type: DataTypes.STRING,
  },
  Colony: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});
module.exports = { patient };
