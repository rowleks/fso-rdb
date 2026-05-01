const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Session = sequelize.define(
  'session',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'sessions',
    underscored: true,
  }
)

module.exports = Session
