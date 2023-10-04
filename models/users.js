
const {  DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { getHashPassword } = require("../utils/password");
const { hospital } = require("./hospital");
const user=sequelize.define('user',{
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false // Or DataTypes.UUIDV1
      },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
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
        
    },
    role:{
        type:DataTypes.ENUM("admin","doctor","patient"),
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

module.exports={user}