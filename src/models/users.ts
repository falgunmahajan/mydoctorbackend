import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { getHashPassword } from "../utils/password";

export interface userAttributes {
  Id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  gender: string;
  role: string;
  enabled: boolean;
  deleted: boolean;
}
interface userInstance extends Model<userAttributes>, 
userAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const user = sequelize.define<userInstance>("user", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, 
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value:string){
        this.setDataValue('password',getHashPassword(value))
    }
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "others"),
  },
  role: {
    type: DataTypes.ENUM("admin", "doctor", "patient"),
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

