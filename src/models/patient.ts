import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import { user } from "./users";


export interface patientAttributes {
  Id: string;
  userId:string;
  dob?:string;
  BloodGroup?:string;
  HouseNo?:string;
  Colony?:string;
  city?:string;
  state?:string;
  country?:string;
  pincode?:string;
  image?:string;
}
interface patientCreationAttributes
  extends Optional<patientAttributes, 'Id'> {}
interface patientInstance extends Model<patientAttributes,patientCreationAttributes>, 
patientAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}


export const patient = sequelize.define<patientInstance>("patient", {
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
patient.belongsTo(user)

