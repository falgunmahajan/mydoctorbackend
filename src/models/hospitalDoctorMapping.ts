import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import { doctors } from "./doctors";
import { hospital } from "./hospital";


export interface DoctorHospitalAttributes {
    Id: string;
    hospitalId:string;
    doctorId:string;
    consultationFee:number;
    position:string
  }
  interface DoctorHospitalCreationAttributes
  extends Optional<DoctorHospitalAttributes, 'Id'> {}
  interface DoctorHospitalInstance extends Model<DoctorHospitalAttributes,DoctorHospitalCreationAttributes>, 
  DoctorHospitalAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }

export const hospitalDoctorMapping=sequelize.define<DoctorHospitalInstance>("hospitalDoctorMapping",{
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
