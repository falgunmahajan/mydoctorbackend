const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

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
  profile: {
    dob:DataTypes.STRING,
    BloodGroup: DataTypes.STRING,
    HouseNo: DataTypes.STRING,
    Colony: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pincode: DataTypes.STRING,
    image: DataTypes.STRING,
  },
});
module.exports={patient}
