
const {  DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { getHashPassword } = require("../utils/password");
const patient=sequelize.define('patient',{
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false // Or DataTypes.UUIDV1
      },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
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
    gender:{
        type:DataTypes.ENUM("male","female","others"),
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM("admin","patient","hospital"),
        allowNull:false,
    },
    enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue: true 
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    profile:{
        type:DataTypes.JSON
    }
})

module.exports={patient}