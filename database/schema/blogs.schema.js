const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Blog = sequelize.define(
  'blog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1991,
          msg: 'Year must be at least 1991',
        },
        max: {
          args: new Date().getFullYear(),
          msg: `Year cannot be greater than ${new Date().getFullYear()}`,
        },
      },
    },
  },
  {
    tableName: 'blogs',
    underscored: true,
  }
)

module.exports = Blog
