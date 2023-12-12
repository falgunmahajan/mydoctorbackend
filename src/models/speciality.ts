import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface specialityAttributes {
  Id: string;
 name:string;
 enabled:boolean;
 reviewed:boolean;
 deleted:boolean;
 imageUrl:string
}
export interface specialityInstance extends Model<specialityAttributes>, 
specialityAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const speciality = sequelize.define<specialityInstance>("speciality", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, // Or DataTypes.UUIDV1
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reviewed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

