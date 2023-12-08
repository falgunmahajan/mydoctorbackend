import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { getHashPassword } from "../utils/password";

export interface hospitalAttributes {
  Id: string;
  hospitalName: string;
  email: string;
  contactNumber: string;
  password: string;
  location: string;
  enabled: boolean;
  deleted: boolean;
}
interface hospitalInstance extends Model<hospitalAttributes>, 
hospitalAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
export const hospital=sequelize.define<hospitalInstance>('hospital',{
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false // Or DataTypes.UUIDV1
      },
    hospitalName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
   
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    contactNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value:string){
            this.setDataValue('password',getHashPassword(value))
        }      
    },
    location:{
          type:DataTypes.STRING,
          allowNull:false
    },
    enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue: true 
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
})

