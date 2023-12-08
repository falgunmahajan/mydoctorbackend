import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import { doctors } from "./doctors";
import { speciality } from "./speciality";

interface DoctorSpecialityAttributes {
    Id: string;
    doctorId:string;
    specialityId:string;
  }
  interface DoctorSpecialityCreationAttributes
  extends Optional<DoctorSpecialityAttributes, 'Id'> {}
  interface DoctorSpecialityInstance extends Model<DoctorSpecialityAttributes,DoctorSpecialityCreationAttributes>, 
  DoctorSpecialityAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }

export const doctorSpecialityMapping=sequelize.define<DoctorSpecialityInstance>("doctorSpecialityMapping",{
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
