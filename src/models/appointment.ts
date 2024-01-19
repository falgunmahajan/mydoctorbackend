import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { slots } from "./slots";
import { doctors } from "./doctors";
import { patient } from "./patient";
interface appointmentAttributes {
    Id: string;
    patientId:string;
    doctorId:string;
    slotId:string;
    appointmentStatus:string,
    otherName:string,
    otherMobileNumber:string
  }
  interface appointmentInstance extends Model<appointmentAttributes>, 
 appointmentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }
export const appointment=sequelize.define<appointmentInstance>("appointments",{
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Or DataTypes.UUIDV1
      },
     patientId: {
        type: DataTypes.UUID,
        references: {
          model: patient,
          key: "Id",
        },
      },
      doctorId: {
        type: DataTypes.UUID,
        references: {
          model: doctors,
          key: "Id",
        },
      },
     slotId: {
        type: DataTypes.UUID,
        references: {
          model: slots,
          key: "Id",
        },
      },
      appointmentStatus:{
        type:DataTypes.ENUM("Not Started","Ongoing","Completed","Cancelled"),
        defaultValue:"Not Started"
      },
      otherName: {
        type: DataTypes.STRING,
      },
      otherMobileNumber: {
        type: DataTypes.STRING,
      },
})
appointment.belongsTo(slots)
appointment.belongsTo(doctors)
appointment.belongsTo(patient)

