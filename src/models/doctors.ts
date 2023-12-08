import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import { user } from "./users";


export interface doctorAttributes {
  Id: string;
  userId:string;
  languages?:Array<string>;
  bio?:string;
  image?:string;
  Qualification?:Array<string>;
  licenceNumber?:string;
  experience?:Array<string>
}
interface doctorCreationAttributes
  extends Optional<doctorAttributes, 'Id'> {}
interface doctorInstance extends Model<doctorAttributes,doctorCreationAttributes>, 
doctorAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const doctors = sequelize.define<doctorInstance>("doctor", {
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
  languages: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  bio: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  Qualification: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  licenceNumber: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
});

doctors.belongsTo(user);

