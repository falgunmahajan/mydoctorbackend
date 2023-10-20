const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { doctors } = require("./doctors");
const { speciality } = require("./speciality");

const doctorSpecialityMapping=sequelize.define("doctorSpecialityMapping",{
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false // Or DataTypes.UUIDV1
      },
      doctorId:{
        type:DataTypes.UUID,
        references: {
            model: doctors,
            key: "Id",
          },
      },
      specialityId:{
        type:DataTypes.UUID,
        references: {
            model: speciality,
            key: "Id",
          },
      }
})
doctors.belongsToMany(speciality,{through:doctorSpecialityMapping})
speciality.belongsToMany(doctors,{through:doctorSpecialityMapping})
module.exports={doctorSpecialityMapping}