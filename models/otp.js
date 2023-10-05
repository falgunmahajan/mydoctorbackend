const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const otpModel=sequelize.define('otp',{
    otp:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    updatedAt:false,
    expires:300000
})
module.exports={otpModel}