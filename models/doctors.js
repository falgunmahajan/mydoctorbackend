const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { speciality } = require("./speciality");

const { user } = require("./users");

const doctors = sequelize.define("doctor", {
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
    languages:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    bio:{
      type:DataTypes.STRING
    },
    Qualification:
    {
     type: DataTypes.ARRAY(DataTypes.JSON)},
    Specialities:{
      type:DataTypes.ARRAY({
        type:DataTypes.UUID,
        references: {
            model: speciality,
            key: "Id",
          },
    })},
    licenceNumber:{
      type:DataTypes.STRING},
    experience:{
      type:DataTypes.ARRAY(DataTypes.JSON)}
});
doctors.belongsTo(user)
module.exports={doctors}
