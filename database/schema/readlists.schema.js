const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Readlist = sequelize.define(
  'readlist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'readlists',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'blogId'],
      },
    ],
  }
)

module.exports = Readlist
