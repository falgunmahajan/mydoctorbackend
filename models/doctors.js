const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { speciality } = require("./speciality");
const { hospital } = require("./hospital");

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
  profile:{
    languages:DataTypes.ARRAY(DataTypes.STRING),
    bio:DataTypes.STRING,
    Qualification:DataTypes.ARRAY({
        name:DataTypes.STRING,
        institute:DataTypes.STRING,
        year:DataTypes.STRING
    }),
    Specialities:DataTypes.ARRAY({
        type:DataTypes.UUID,
        references: {
            model: speciality,
            key: "Id",
          },
    }),
    licenceNumber:DataTypes.STRING,
    experience:DataTypes.ARRAY({
        position:DataTypes.STRING,
        place:DataTypes.STRING,
        fromYear:DataTypes.STRING,
        fromMonth:DataTypes.STRING,
        toYear:DataTypes.STRING,
        toMonth:DataTypes.STRING
    })
  }
});
module.exports={doctors}
