const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { user } = require("./users");
const { doctors } = require("./doctors");

const slots = sequelize.define("slot",{
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
    allowNull:false
  },
});
module.exports={slots}
