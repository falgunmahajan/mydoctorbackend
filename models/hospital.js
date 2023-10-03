
const {  DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { getHashPassword } = require("../utils/password");
const hospital=sequelize.define('hospital',{
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
        set(value){
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

module.exports={hospital}