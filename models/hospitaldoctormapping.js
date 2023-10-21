const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { doctors } = require("./doctors");
const { hospital } = require("./hospital");

const hospitalDoctorMapping=sequelize.define("hospitalDoctorMapping",{
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false // Or DataTypes.UUIDV1
      },
      hospitalId:{
        type:DataTypes.UUID,
        references: {
            model: hospital,
            key: "Id",
          },
      },
      doctorId:{
        type:DataTypes.UUID,
        references: {
            model: doctors,
            key: "Id",
          },
      },
      consultationFee:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      position:{
        type:DataTypes.STRING,
        allowNull:false
      }
})
doctors.belongsToMany(hospital,{through:hospitalDoctorMapping})
hospital.belongsToMany(doctors,{through:hospitalDoctorMapping})
module.exports={hospitalDoctorMapping}