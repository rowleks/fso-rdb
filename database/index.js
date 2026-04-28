const { Sequelize } = require('sequelize')
const config = require('../utils/config')
const { runMigrations, runSeedMigration } = require('./umzug')

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connected successfully')
  } catch (err) {
    console.error('DB connection failed:', err)
  }
}

module.exports = {
  sequelize,
  connectDB,
  runMigrations: async () => runMigrations(sequelize),
  runSeedMigration: async () => runSeedMigration(sequelize),
}
