const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Username must be a valid email address',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['passwordHash'],
      },
    },
    scopes: {
      withPasswordHash: {
        attributes: {},
      },
    },
  }
)

module.exports = User
