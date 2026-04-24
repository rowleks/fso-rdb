const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Note = sequelize.define(
  'note',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'notes',
    underscored: true,
    timestamps: false,
  }
)

module.exports = Note
