import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { doctors } from "./doctors";
interface slotsAttributes {
  Id: string;
  startTime:Date;
  endTime:Date;
  doctorId:string;
  deleted:boolean;
  size:number;
  count:number
}
interface slotsInstance extends Model<slotsAttributes>, 
slotsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const slots = sequelize.define<slotsInstance>("slot",{
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, // Or DataTypes.UUIDV1
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  doctorId:{
    type: DataTypes.UUID,
    references:{
        model:doctors,
        key:"Id"
    },
    allowNull:false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  size:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  count:{
    type:DataTypes.INTEGER,
    defaultValue: 0,
  },
});

slots.belongsTo(doctors)